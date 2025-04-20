import { QUERY_KEY } from "constants/query";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categoriesApi from "apis/categories";
import { t } from "i18next";
import { Toastr } from "neetoui/index";

export const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORIES],
    queryFn: () => categoriesApi.fetch(),
  });

export const useShowCategory = id =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORY],
    queryFn: () => categoriesApi.show(id),
    enabled: !!id,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: payload => categoriesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.CATEGORIES);
      Toastr.success(t("response.success.categoryCreated"));
    },
  });

  return mutation;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ categoryId, payload }) =>
      categoriesApi.update({ categoryId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.CATEGORIES);
      Toastr.success(t("response.success.categoryUpdated"));
    },
  });

  return mutation;
};

export const useReorderCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ categoryId, payload }) =>
      categoriesApi.reorder({ categoryId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.CATEGORIES);
    },
  });

  return mutation;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ categoryId, newCategoryId }) =>
      categoriesApi.destroy({ categoryId, newCategoryId }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.CATEGORIES);
      Toastr.success(t("response.success.categoryDeleted"));
    },
  });

  return mutation;
};
