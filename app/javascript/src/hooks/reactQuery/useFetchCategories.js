import { useQuery } from "@tanstack/react-query";

import categoriesApi from "../../apis/categories";
import { QUERY_KEY } from "../../constants/query";

const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORIES],
    queryFn: categoriesApi.fetch,
  });

export default useFetchCategories;
