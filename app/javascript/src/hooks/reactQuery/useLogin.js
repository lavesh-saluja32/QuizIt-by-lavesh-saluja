import { useMutation } from "@tanstack/react-query";

import authApi from "../../apis/authentication";
import { setAuthHeaders } from "../../apis/axios";
import { setToLocalStorage } from "../../utils/storage";

const useLogin = () =>
  useMutation({
    mutationFn: values => authApi.login(values),

    onSuccess: (response, values) => {
      setToLocalStorage({
        authToken: response.data.authenticationToken,
        email: values.email.toLowerCase(),
        userId: response.data.id,
        userName: response.data.name,
      });

      setAuthHeaders();
    },
  });

export default useLogin;
