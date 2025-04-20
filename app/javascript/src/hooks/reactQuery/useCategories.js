import { QUERY_KEY } from "constants/query";

import { useQuery } from "@tanstack/react-query";
import categoriesApi from "apis/categories";

export const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORIES],
    queryFn: () => categoriesApi.fetch(),
  });
