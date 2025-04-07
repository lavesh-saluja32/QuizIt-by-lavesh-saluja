import { useQuery } from "@tanstack/react-query";
import quizzesApi from "apis/public/quizzes";
import { QUERY_KEY } from "../../../constants/query";
export const useFetchQuizzes = params =>
  useQuery({
    queryKey: [QUERY_KEY.QUIZZES, params],
    queryFn: () => quizzesApi.fetch(params),
  });

export const useShowQuiz = quizId =>
  useQuery({
    queryKey: [QUERY_KEY.QUIZ, quizId],
    queryFn: () => quizzesApi.show(quizId),
  });
