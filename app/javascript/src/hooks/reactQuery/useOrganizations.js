import { Toastr } from "@bigbinary/neetoui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import usersApi from "../../apis/users";
import { QUERY_KEY } from "../../constants/query";

export const useUpdateOrganization = () => {
  const mutation = useMutation({
    mutationFn: payload => usersApi.update(payload),
    onSuccess: () => {
      Toastr.success(t("response.success.quizUpdated"));
    },
  });

  return mutation;
};

export const useShowOrganization = () =>
  useQuery({
    queryKey: [QUERY_KEY.ORGANIZATION],
    queryFn: () => usersApi.show(),
  });
