import React from "react";

import LoginForm from "./Form/Login";

import useLogin from "../../hooks/reactQuery/useLogin";
import { routes } from "../../routes";

const Login = () => {
  const loginMutation = useLogin();

  const handleSubmit = async values => {
    loginMutation.mutate(values, {
      onSuccess: () => window.location.replace(routes.root),
    });
  };

  return <LoginForm {...{ handleSubmit, loading: loginMutation.isPending }} />;
};

export default Login;
