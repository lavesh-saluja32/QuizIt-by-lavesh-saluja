import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

import authApi from "../../apis/authentication";
import { setAuthHeaders } from "../../apis/axios";
import { routes } from "../../routes";
import { setToLocalStorage } from "../../utils/storage";

const useLogin = () => {
  const history = useHistory();

  return useMutation({
    mutationFn: async values => {
      const response = await authApi.login(values);

      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: values.email.toLowerCase(),
        userId: response.data.id,
        userName: response.data.name,
      });

      setAuthHeaders();

      return response.data;
    },
    onSuccess: () => {
      history.push(routes.root);
    },
  });
};

export default useLogin;
