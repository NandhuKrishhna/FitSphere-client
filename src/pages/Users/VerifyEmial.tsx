import React from "react";


import { motion } from "framer-motion";
import styled from "styled-components";
import { CircleArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BoxStyled = styled(motion.div)`
  max-width: 28rem;
  width: 100%;
  background: rgba(75, 85, 99, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const EmailVerificationPage: React.FC = () => {

 

  return (
    <>
   
    <BoxStyled
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-indigo-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <p className="text-center font-bold text-2xl text-gray-300 mb-4">
          Click here to verify your account and activate your profile.
        </p>
        {/* <motion.button
          className="mt-5 w-full py-3 px-4 bg-indigo-500 text-white font-bold rounded-lg shadow-lg hover:from-black-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:indigo-green-500 focus:ring-offset-2 transition duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? <Loader className="animate-spin mx-auto"/> : "Verify Email"}
        </motion.button> */}
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <p className="text-sm text-gray-400 flex items-center gap-2">
          <CircleArrowLeft className="w-6 h-6" />
          <Link 
            to="/login"
            className="text-indigo-400 font-bold text-base hover:underline"
          >
            Go back to Login
          </Link>
        </p>
      </div>
    </BoxStyled>

    </>
  );
};

export default EmailVerificationPage;
