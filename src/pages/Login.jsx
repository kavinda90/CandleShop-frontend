import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {SectionTitle} from "../components";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../features/auth/authSlice";
import "../styles/User.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (loginState) {
      navigate("/");
    }
  }, [loginState]);

  const isValidate = () => {
    let isProceed = true;

    if (!email.length) {
      isProceed = false;
      toast.warn("Email is required");
    } else if (!password.length) {
      isProceed = false;
      toast.warn("Password is required");
    }
    return isProceed;
  };

  const proceedLogin = (e) => {
    e.preventDefault();
    if (isValidate()) {
      axios.post(`${process.env.REACT_APP_API}/user/login`, {
        email, password
      })
      .then((res) => {
        toast.success("Login successful");
        dispatch(loginUser(res.data));
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.message);
      });
    }
  };

  return (
      <>
        <SectionTitle title="Login" path="Home | Login"/>
        <div className="d-flex flex-column justify-content-center py-sm-5">
          <div className="p-5 mx-auto">
            <div className="bg-dark border border-secondary w-100 rounded shadow divide-y divide-gray-200">
              <form className="px-5 py-5" onSubmit={proceedLogin}>
                <label className="fw-semibold small pb-1 d-block text-white">
                  E-mail
                </label>
                <input
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                />
                <label className="fw-semibold small pb-1 d-block text-white">
                  Password
                </label>
                <input
                    type="password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded px-3 py-2 mt-1 mb-5 small w-100"
                />
                <button
                    type="submit"
                    className="text-white w-100 py-2 rounded small fw-semibold text-center d-inline-block btn btn-outline-secondary"
                >
                  <span className="d-inline-block me-2">Login</span>
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
                  to="/register"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => window.scrollTo(0, 0)}
              >
                Don't have an account? Please register.
              </Link>
            </div>
          </div>
        </div>
      </>
  );
};

export default Login;
