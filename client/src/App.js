import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import CreateJob from "./components/CreateJob";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CompanyPage from "./pages/CompanyPage";
import ApplicantPage from "./pages/ApplicantPage";
import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage";
import SamplePage from "./pages/SamplePage";
import Companies from "./components/Companies";
import CompaniesTablePage from "./pages/CompaniesTablePage";
import QuestionPage from "./components/QuestionPage";
import ConfirmEmail from "./pages/ConfirmEmail";
import Record from "./pages/Record";

function App() {
  axios.defaults.baseURL =
    "https://3508-2401-4900-5d23-42f8-2cb8-5e25-5c62-40ff.ngrok-free.app";

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage["token"]);
  // useEffect(()=>{
  //   setIsLoggedIn(lo)
  // }, [])

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route exact index path="/" element={<LandingPage />} />
        <Route exact path="/register/:whoIsIt" element={<Register />} />
        <Route exact path="/login/:whoIsIt" element={<LoginPage />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/addJob" element={<CreateJob />} />
        <Route exact path="/company/dashboard" element={<CompanyPage />} />
        <Route exact path="/admin/dashboard" element={<AdminPage />} />
        <Route exact path="/dashboard" element={<ApplicantPage />} />
        <Route exact path="/question" element={<SamplePage />} />
        <Route exact path="/confirm" element={<ConfirmEmail />} />
        {/* <Route exact path="/startTest" element={<SamplePage />} /> */}
        <Route exact path="/companies" element={<CompaniesTablePage />} />
      </Routes>
    </>
  );
}

export default App;
