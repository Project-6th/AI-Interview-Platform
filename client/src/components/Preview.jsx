import React, { useRef } from "react";
import "../styles/Preview.css";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Preview = ({
  formData,
  logo,
  certificate,
  prevStep,
  fileTypeLogo,
  fileTypeCerti,
}) => {
  const imgRef = useRef(false);
  const certificateRef = useRef(false);

  const handleImageChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      // to update the image displayed in the modal
      imgRef.current.src = URL.createObjectURL(file);
    }
    e.target.value = null;
  };
  const handleCertificateChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      // to update the image displayed in the modal
      certificateRef.current.src = URL.createObjectURL(file);
    }
    e.target.value = null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await axios();
    console.log(fileTypeLogo);
    const { name, email, password, address, country } = formData;
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("address", address);
    data.append("password", password);
    data.append("country", country);
    data.append("logo", logo);
    data.append("certificate", certificate);
    data.append("file_type_logo", fileTypeLogo);
    data.append("file_type_certi", fileTypeCerti);

    axios
      .post("/company/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        // <Navigate to={"/verify"} />;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="visible-area">
      <div className="company-preview">
        <div className="heading-box">
          <div className="heading">Profile Preview</div>
          <div className="about-heading">
            Update your company photo and details here.
          </div>
        </div>
        <div className="divider"></div>
        <div className="field-box">
          <div className="field-left">
            <div className="field">Company Logo</div>
            <div className="field-detail">Update your company logo here.</div>
          </div>
          <div className="field-right">
            <div className="image">
              <img src={logo} alt="" ref={imgRef} />
              <input
                type="file"
                id="profile-picture"
                hidden
                disabled
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="field-box">
          <div className="field-left">
            <div className="field">Company Name</div>
            <div className="field-detail">
              Update the name of your company here.
            </div>
          </div>
          <div className="field-right">
            <input
              type="text"
              readOnly
              value={formData.email}
              className="field-input-preview"
              name="name"
              placeholder="Name of the company"
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className="field-box">
          <div className="field-left">
            <div className="field">Company Address</div>
            <div className="field-detail">
              Update the address of your company here.
            </div>
          </div>
          <div className="field-right">
            <input
              type="text"
              readOnly
              value={formData.address}
              className="field-input-preview"
              name="address"
              placeholder="Address of the company"
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className="field-box">
          <div className="field-left">
            <div className="field">Company Email</div>
            <div className="field-detail">Enter the email of your company.</div>
          </div>
          <div className="field-right">
            <input
              type="text"
              readOnly
              value={formData.email}
              className="field-input-preview"
              name="email"
              placeholder="Email of the company"
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className="field-box">
          <div className="field-left">
            <div className="field">Company Certificate</div>
            <div className="field-detail">
              Upload your certificate to proof the genuinity of the company.
            </div>
          </div>
          <div className="field-right">
            <div className="certificate-image">
              <img src={certificate} alt="" ref={certificateRef} />
              <input
                type="file"
                disabled
                id="certificate"
                hidden
                onChange={handleCertificateChange}
              />
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="preview-buttons">
          <button
            className="edit-button"
            type="verifybutton"
            onClick={prevStep}
          >
            <div>Edit</div>
          </button>
          <button
            className="register-button"
            type="verifybutton"
            onClick={handleSubmit}
          >
            <div>Register</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
