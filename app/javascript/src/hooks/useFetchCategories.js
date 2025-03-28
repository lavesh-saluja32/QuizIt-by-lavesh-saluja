import { useQuery } from "@tanstack/react-query";

import categoriesApi from "../apis/categories";
import { QUERY_KEY } from "../constants/query";

const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORIES], // ✅ Unique key for caching
    queryFn: categoriesApi.fetch, // ✅ API call function
    staleTime: 5 * 60 * 1000, // ✅ Cache for 5 minutes
  });

export default useFetchCategories;
