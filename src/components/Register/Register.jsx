import React, { use, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const Register = () => {
  const googleProvider = new GoogleAuthProvider();

  const { createUser, setUser, updateUser } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const photoUrl = event.target.photoUrl.value;
    const password = event.target.password.value;

    if (password.length < 6) {
      alert("password must be equal or greater than 6");
      return;
    }
    if (!/[a-z]/.test(password)) {
      alert("password must be contain at least one lower case letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      alert("password must be contain at least one UpperCase  letter");
      return;
    }
    // console.log({ name, email, photoUrl, password });
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
            toast(" User SignUp by successfully");
            setUser({ ...user, displayName: name, photoURL: photoUrl });
            navigate("/");
          })
          .catch((error) => {
            // console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        // const errorMassage = error.massage;
        // alert(errorMassage);
      });
  };

  const handleGoogleSignUp = () => {
    console.log("google signIn clicked");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // console.log(result);
        toast(" User SignUp by Google successfully");
        navigate("/");
      })
      .catch((error) => {
        // console.log(error);
        toast(" User SignUp by Google Unsuccessfully");
      });
  };
  return (
    <div className="flex justify-center items-center py-10">
      <Helmet>
        <title>SignUp-Form</title>
      </Helmet>
      <div className="w-full max-w-md p-4 rounded-md shadow-2xl  sm:p-8 bg-black text-white">
        <h2 className="mb-6 mt-3 text-3xl font-semibold text-center">
          SignUp to your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-base font-semibold">
                User Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300
                 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-base font-semibold">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300
                 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="photoUrl"
                className="block text-base font-semibold"
              >
                PhotoUrl address
              </label>
              <input
                type="text"
                name="photoUrl"
                id="photoUrl"
                placeholder="photoUrl link"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300
                 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-base font-semibold">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300
                 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="btn btn-xs absolute top-2 right-5"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-gray-600">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>

          <div className="my-6 space-y-4">
            <button
              onClick={handleGoogleSignUp}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p className="text-base font-semibold">Sign In with Google</p>
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 text-base font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Sign Up
          </button>

          <p className="text-base text-center">
            Already have account ?
            <NavLink
              to="/auth/login"
              className="focus:underline hover:underline"
            >
              <span className="text-blue-400 text-lg font-medium">
                {" "}
                SigIn here
              </span>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
