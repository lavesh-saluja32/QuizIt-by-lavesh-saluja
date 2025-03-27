import { Toastr } from "@bigbinary/neetoui";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

import authApi from "../../apis/authentication";
import { routes } from "../../routes";

const useSignup = () => {
  const history = useHistory();

  return useMutation({
    mutationFn: async values => await authApi.signup(values),
    onSuccess: () => {
      history.push(routes.root);
    },
    onError: error => {
      Toastr.error(error?.response?.data?.error || "Something went wrong!");
    },
  });
};

export default useSignup;
