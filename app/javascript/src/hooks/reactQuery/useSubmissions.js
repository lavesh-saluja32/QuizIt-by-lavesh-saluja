import { QUERY_KEY } from "constants/query";

import { useQuery } from "@tanstack/react-query";
import submissionsApi from "apis/submissions";

export const useFetchSubmissions = ({ quizId, params }) =>
  useQuery({
    queryKey: [QUERY_KEY.SUBMISSIONS, quizId, params],
    queryFn: () => submissionsApi.fetch({ quizId, params }),
  });
