import { useMutation } from "@tanstack/react-query";
import authApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { setToLocalStorage } from "utils/storage";

const useLogout = () => {
  const history = useHistory();

  return useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: () => {
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });

      resetAuthTokens();
      history.replace(routes.root);
    },
  });
};

export default useLogout;
