const Company = require("../models/Company");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const {uploadFile,getSignUrlForFile} = require('../utils/s3')


const signToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const { id } = user;
    const data = {
        id
    };
    const token = signToken(data);

    return res.status(statusCode).json({
        status: "success",
        token,
        user,
    });
};

exports.registerCompany = async (req, res, next) => {
    try {
        const company = await Company.findOne({ email:req.body.email });
        if (company) {
            return res.status(401).json({
                status: "fail",
                message: "Company already exists",
            });
        }
        let newCompany;
        
        const base64StringLogo = req.body.logo.replace(/^data:image\/\w+;base64,/, "");
        const base64StringCerti = req.body.certificate.replace(/^data:image\/\w+;base64,/, "");

        const buffLogo = new Buffer(base64StringLogo, "base64");
        const buffCerti = new Buffer(base64StringCerti, "base64");

        const file_name_logo = `${Date.now()}_companyLogo_${req.body.name}`
        const file_name_certi = `${Date.now()}_companyCerti_${req.body.name}`


        await uploadFile(buffLogo,file_name_logo)

        await uploadFile(buffCerti,file_name_certi)

        console.log(getSignUrlForFile(file_name_logo))

        req.body.companyLogo = file_name_logo
        req.body.companyCertificate = file_name_certi
        req.body.verifyCode = Math.floor(Math.random()*(9000)+1000)

        newCompany = await Company.create(req.body);


        const verifyURL = `${req.protocol}://${req.get("host")}/company/verifyMail/${newCompany.verifyCode}/${newCompany._id}`

        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${verifyURL}.\nIf you didn't forget your password, please ignore this email!`

        await sendEmail({
            email: req.body.email,
            subject: "Email Verification",
            message,
        })

        if (!newCompany) {
            return res.status(401).json({
                status: "fail",
                message: "Company not created",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Company created successfully",
            user: newCompany
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error,
        });
    }
}

exports.loginCompany = async(req,res,next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                status: "fail",
                message: "Please provide Email and password",
            });
        }

        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(401).json({
                status: "fail",
                message: `Incorrect email or password`,
            });
        }
        console.log(company)
        if(!company.emailVerified || !company.isVerified){
            return res.status(200).json({
                message:"Account is not verified"
            })
        }
        const correct = await company.correctPassword(password, company.password);

        console.log(correct)
        
        if (!correct) {
            return res.status(401).json({
                status: "fail",
                message: `Incorrect email or password`,
            });
        }
        createSendToken(company, 200, res);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
}

exports.confirmEmail = async (req, res, next) => {
    try{
        const verifyCode = req.params.code;
        const userId = req.params.userId;

        console.log(userId)

        const user = await Company.findOne({
            verifyCode,
            _id:userId
        })

        if(user){
            user.emailVerified = true;
            await user.save();

            return res.status(200).json({
                message:"Email Verified"
            })
        }else{
            return res.status(401).json({
                message:"Wrong code"
            })
        }

    }catch (error) {
        console.log(error);
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
}

exports.authPass = async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = await req.headers.authorization.split(" ")[1];
    }

    if (!token || token === "null") {
        return res.status(200).json({
            message: "You aren't Logged In",
        });
    }

    // 2) Verification token
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(200).json({
                status: "fail",
                message: "Session expired"
            })
        }
        return res.status(200).json({
            status: "fail",
            message: "An error occured"
        })
    }
    // console.log("My decoded", decoded);
    // GRANT ACCESS TO PROTECTED ROUTE
    // 3) Check if user still exists
    // console.log(decoded);
    try{
        const currentUser = await Company.findById(decoded.id)
    
    
        // 4) Check if user changed password after the token was issued
    
        req.user = currentUser;
        // console.log("This is req.user from middlwwRE", req.user);
        res.locals.user = currentUser;
        console.log("Successfully Passed Middlware");
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};