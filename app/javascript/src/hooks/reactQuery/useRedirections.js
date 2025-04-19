import { QUERY_KEY } from "constants/query";

import { Toastr } from "@bigbinary/neetoui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import redirectionsApi from "apis/redirections";
import { t } from "i18next";

export const useFetchRedirections = () =>
  useQuery({
    queryKey: [QUERY_KEY.REDIRECTIONS],
    queryFn: () => redirectionsApi.fetch(),
  });

export const useCreateRedirection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: payload => redirectionsApi.create(payload),
    onSuccess: () => {
      Toastr.success(t("response.success.redirectionCreated"));
      queryClient.invalidateQueries(QUERY_KEY.REDIRECTIONS);
    },
  });

  return mutation;
};

export const useUpdateRedirection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ redirectionId, payload }) =>
      redirectionsApi.update(redirectionId, payload),
    onSuccess: () => {
      Toastr.success(t("response.success.redirectionUpdated"));
      queryClient.invalidateQueries(QUERY_KEY.REDIRECTIONS);
    },
  });

  return mutation;
};

export const useDeleteRedirection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: id => redirectionsApi.destroy(id),
    onSuccess: () => {
      Toastr.success(t("response.success.redirectionDeleted"));
      queryClient.invalidateQueries(QUERY_KEY.REDIRECTIONS);
    },
  });

  return mutation;
};
