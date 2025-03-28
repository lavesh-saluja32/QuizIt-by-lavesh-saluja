import { useQuery } from "@tanstack/react-query";

import categoriesApi from "../apis/categories";

const useCategories = () =>
  useQuery({
    queryKey: ["categories"], // ✅ Unique key for caching
    queryFn: categoriesApi.fetch, // ✅ API call function
    staleTime: 5 * 60 * 1000, // ✅ Cache for 5 minutes
  });

export default useCategories;
