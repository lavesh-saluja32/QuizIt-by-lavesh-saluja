import { Toastr } from "@bigbinary/neetoui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

import organizationsApi from "../../apis/organizations";
import usersApi from "../../apis/users";
import { QUERY_KEY } from "../../constants/query";

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: payload => organizationsApi.update(payload),
    onSuccess: () => {
      Toastr.success(t("response.success.quizUpdated"));
      queryClient.invalidateQueries(QUERY_KEY.ORGANIZATION);
    },
  });

  return mutation;
};

export const useShowOrganization = () =>
  useQuery({
    queryKey: [QUERY_KEY.ORGANIZATION],
    queryFn: () => usersApi.show(),
  });
