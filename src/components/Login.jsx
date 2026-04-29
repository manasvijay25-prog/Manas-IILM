import { useState, useRef } from "react";
import Header from "./Header";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firbase";
import { useNavigate } from "react-router";
import LOGO from "../utils/constants"

const Login = () => {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const [isSignIn, setIsSignIn] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    const inputEmail = email.current.value;
    const inputPassword = password.current.value;


    const message = checkValidData(inputEmail, inputPassword);
    setErrMessage(message);

    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessages = error.message;

          setErrMessage(errorCode + " " + errorMessages);
        });
    } else {
      signInWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessages = error.message;

          setErrMessage(errorCode + " " + errorMessages)
        })
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0 -z-10">
        <img
          src={LOGO}
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
      >
        <div className="w-80 sm:w-96 bg-black/70 p-8 rounded-md flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          {!isSignIn && (
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 m-4 bg-transparent border border-gray-600 rounded text-white"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="w-full p-4 m-4 bg-transparent border border-gray-600 rounded text-white"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-4 m-4 bg-transparent border border-gray-600 rounded text-white"
          />
          <button
            type="submit"
            className="w-full p-4 m-4 bg-red-600 text-white rounded"
            onClick={handleButtonClick}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-red-500 text-sm font-bold">{errMessage}</p>
          {isSignIn && (
            <h6 className="text-white text-smm m-4">Forgot your password?</h6>
          )}
          <h4
            className="text-white text-sm cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignIn
              ? "New to Cineverse? Sign Up Now "
              : "Already Registered? Sign In Now"}
          </h4>
        </div>
      </form>
    </div>
  );
};

export default Login;
