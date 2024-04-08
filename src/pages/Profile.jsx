import React, {useEffect, useState} from "react";
import {SectionTitle} from "../components";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {updateProfile} from "../features/auth/authSlice";

const Profile = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [userFormData, setUserFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setUserFormData(userProfile);
  }, [userProfile])

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (userFormData?.firstName.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in first name field";
    } else if (userFormData?.lastName.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in last name field";
    } else if (userFormData?.email.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in email field";
    } else if (userFormData?.phone.length < 4) {
      isProceed = false;
      errorMessage = "Phone must be longer than 3 characters";
    } else if (userFormData?.address.length < 4) {
      isProceed = false;
      errorMessage = "Address must be longer than 3 characters";
    } else if (userFormData?.password && userFormData?.password.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a password longer than 5 characters";
    } else if (userFormData?.password && userFormData?.password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Passwords must match";
    }

    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();

    if (isValidate()) {
      axios.put("http://localhost:9000/user/profile", userFormData)
      .then((res) => {
        dispatch(updateProfile(res.data));
        toast.success("Profile is updated");
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.message);
      });
    }
  }

  const updateField = field => e => {
    setUserFormData(prevState => {
      return {
        ...prevState,
        [field]: e.target.value
      }
    })
  };

  const updateConfirmPassword = () => e => {
    setConfirmPassword(e.target.value);
  };

  return (
      <>
        <SectionTitle title="User Profile" path="Home | User Profile"/>
        <div className="d-flex flex-column justify-content-center py-sm-5">
          <div className="p-5 mx-auto">
            <div className="bg-dark border border-secondary w-100 rounded shadow divide-y divide-gray-200">
              <form className="px-5 py-5" onSubmit={updateUserProfile}>
                <label className="fw-semibold small pb-1 d-block text-white">
                  <span>First Name</span>
                </label>
                <input
                    type="text"
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                    value={userFormData?.firstName}
                    onChange={updateField('firstName')}
                />
                <label className="fw-semibold small pb-1 d-block text-white">
                  <span>Last Name</span>
                </label>
                <input
                    type="text"
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                    value={userFormData?.lastName}
                    onChange={updateField('lastName')}
                />
                <label className="fw-semibold small pb-1 d-block text-white">
                  <span>Your Email</span>
                </label>
                <input
                    type="email"
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                    value={userFormData?.email}
                    onChange={updateField('email')}
                />
                <label className="fw-semibold small pb-1 d-block text-white">
                  <span>Your Phone</span>
                </label>
                <input
                    type="tel"
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                    value={userFormData?.phone}
                    onChange={updateField('phone')}
                />
                <label className="fw-semibold small pb-1 d-block text-white">
                  <span>Your Address</span>
                </label>
                <input
                    type="text"
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                    value={userFormData?.address}
                    onChange={updateField('address')}
                />
                <label className="fw-semibold small pb-1 d-block text-white">
                  <span>New Password</span>
                </label>
                <input
                    type="password"
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                    value={userFormData?.password}
                    onChange={updateField('password')}
                />
                <label className="fw-semibold small pb-1 d-block text-white">
                  <span>Confirm Password</span>
                </label>
                <input
                    type="password"
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                    value={confirmPassword}
                    onChange={updateConfirmPassword()}
                />
                <button
                    type="submit"
                    className="text-white w-100 py-2 rounded small fw-semibold text-center d-inline-block btn btn-outline-secondary px-4"
                >
                  <span className="d-inline-block me-2">Update Profile</span>
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
          </div>
        </div>
      </>
  );
};

export default Profile;
