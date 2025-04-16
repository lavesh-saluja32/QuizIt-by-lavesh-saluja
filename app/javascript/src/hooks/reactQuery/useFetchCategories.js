import { QUERY_KEY } from "constants/query";

import { useQuery } from "@tanstack/react-query";
import categoriesApi from "apis/categories";

const useFetchCategories = params =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORIES, params],
    queryFn: () => categoriesApi.fetch(params),
  });

export default useFetchCategories;
