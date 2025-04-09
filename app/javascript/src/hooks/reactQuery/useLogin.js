import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

import authApi from "../../apis/authentication";
import { setAuthHeaders } from "../../apis/axios";
import { routes } from "../../routes";
import { setToLocalStorage } from "../../utils/storage";

const useLogin = () => {
  const history = useHistory();

  return useMutation({
    mutationFn: values => authApi.login(values),

    onSuccess: (response, values) => {
      setToLocalStorage({
        authToken: response.data.authenticationToken,
        email: values.email.toLowerCase(),
        userId: response.data.id,
        userName: response.data.name,
      });

      setAuthHeaders();
      history.replace(routes.root);
    },
  });
};

export default useLogin;
