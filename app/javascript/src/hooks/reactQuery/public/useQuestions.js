import { useQuery } from "@tanstack/react-query";
import questionsApi from "apis/public/questions";
import { QUERY_KEY } from "constants/query";
export const useFetchQuestions = quizId =>
  useQuery({
    queryKey: [QUERY_KEY.QUESTIONS, quizId],
    queryFn: () => questionsApi.fetch(quizId),
  });
