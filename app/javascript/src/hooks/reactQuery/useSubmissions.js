import { useQuery } from "@tanstack/react-query";

import submissionsApi from "../../apis/submissions";
import { QUERY_KEY } from "../../constants/query";

export const useFetchSubmissions = ({ quizId, params }) =>
  useQuery({
    queryKey: [QUERY_KEY.SUBMISSIONS, quizId, params],
    queryFn: () => submissionsApi.fetch({ quizId, params }),
  });
