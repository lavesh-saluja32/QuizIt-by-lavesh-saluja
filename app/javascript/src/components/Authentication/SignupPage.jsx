import React from "react";

import SignupForm from "./Form/Signup";

import useSignup from "../../hooks/reactQuery/useSignup";

const Signup = () => {
  const { mutate: handleSubmit, isLoading: loading } = useSignup();

  return <SignupForm {...{ handleSubmit, loading }} />;
};

export default Signup;
