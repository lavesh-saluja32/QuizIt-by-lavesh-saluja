import React from "react";

import LoginForm from "./Form/Login";

import useLogin from "../../hooks/reactQuery/useLogin";

const Login = () => {
  const loginMutation = useLogin();

  const handleSubmit = async values => {
    loginMutation.mutate(values); // Triggers the login mutation
  };

  return <LoginForm {...{ handleSubmit, loading: loginMutation.isPending }} />;
};

export default Login;
