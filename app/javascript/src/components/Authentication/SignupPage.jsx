import React from "react";

import useSignup from "hooks/reactQuery/useSignup";

import SignupForm from "./Form/Signup";

const Signup = () => {
  const { mutate: handleSubmit, isLoading: loading } = useSignup();

  return <SignupForm {...{ handleSubmit, loading }} />;
};

export default Signup;
