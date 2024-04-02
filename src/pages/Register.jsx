import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {SectionTitle} from "../components";
import {toast} from "react-toastify";
import "../styles/User.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (firstName.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in first name field";
    } else if (lastName.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in last name field";
    } else if (email.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in email field";
    } else if (phone.length < 4) {
      isProceed = false;
      errorMessage = "Phone must be longer than 3 characters";
    } else if (address.length < 4) {
      isProceed = false;
      errorMessage = "Address must be longer than 3 characters";
    } else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a password longer than 5 characters";
    } else if (confirmPassword.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a confirm password longer than 5 characters";
    } else if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Passwords must match";
    }

    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let regObj = {
      firstName,
      lastName,
      email,
      phone,
      address,
      password,
      userWishlist: [],
    };

    if (isValidate()) {
      fetch("http://localhost:9000/user/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registration Successful");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };
  return (
    <>
      <SectionTitle title="Register" path="Home | Register" />
      <div className="d-flex flex-column justify-content-center py-sm-5">
        <div className="p-5 mx-auto">
          <div className="bg-dark border border-secondary w-100 rounded shadow divide-y divide-gray-200">
            <form className="px-5 py-5" onSubmit={handleSubmit}>
              <label className="fw-semibold small pb-1 d-block text-white">
                First Name
              </label>
              <input
                type="text"
                className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
              />
              <label className="fw-semibold small pb-1 d-block text-white">
                Last Name
              </label>
              <input
                type="text"
                className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={true}
              />
              <label className="fw-semibold small pb-1 d-block text-white">
                E-mail
              </label>
              <input
                type="email"
                className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              <label className="fw-semibold small pb-1 d-block text-white">
                Phone
              </label>
              <input
                type="tel"
                className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
              />
              <label className="fw-semibold small pb-1 d-block text-white">
                Address
              </label>
              <input
                type="text"
                className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required={true}
              />
              <label className="fw-semibold small pb-1 d-block text-white">
                Password
              </label>
              <input
                type="password"
                className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <label className="fw-semibold small pb-1 d-block text-white">
                Repeat Password
              </label>
              <input
                type="password"
                className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
              <button
                type="submit"
                className="text-white w-100 py-2 rounded small fw-semibold text-center d-inline-block btn btn-outline-secondary"
              >
                <span className="d-inline-block me-2">Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="d-inline-block arrow"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/login"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => window.scrollTo(0, 0)}
            >
              Already have an account? Please login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
