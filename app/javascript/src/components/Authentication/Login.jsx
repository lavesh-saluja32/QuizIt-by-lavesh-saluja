import React, { useEffect } from "react";

import { either, isEmpty, isNil } from "ramda";
import { useHistory } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

import LoginForm from "./Form/Login";

import useLogin from "../../hooks/reactQuery/useLogin";
import { routes } from "../../routes";

const Login = () => {
  const loginMutation = useLogin();
  const history = useHistory();

  const handleSubmit = async values => {
    loginMutation.mutate(values, {
      onSuccess: () => window.location.replace(routes.admin),
    });
  };

  const handleLoginNavigation = () => {
    const authToken = getFromLocalStorage("authToken");
    const isLoggedIn = !either(isNil, isEmpty)(authToken);
    if (isLoggedIn) history.push(routes.admin);
  };

  useEffect(() => {
    handleLoginNavigation();
  });

  return <LoginForm {...{ handleSubmit, loading: loginMutation.isPending }} />;
};

export default Login;
