import { useQuery } from "@tanstack/react-query";

import categoriesApi from "../../apis/categories";
import { QUERY_KEY } from "../../constants/query";

const useFetchCategories = params =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORIES, params],
    queryFn: () => categoriesApi.fetch(params),
  });

export default useFetchCategories;
