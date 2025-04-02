import { Toastr } from "@bigbinary/neetoui";
import { useQuery, useMutation } from "@tanstack/react-query";

import questionsApi from "../../apis/questions";
import { QUERY_KEY } from "../../constants/query";

export const useFetchQuestions = quizId =>
  useQuery({
    queryKey: [QUERY_KEY.QUESTIONS, quizId],
    queryFn: () => questionsApi.fetch(quizId),
  });

export const useCreateQuestion = () => {
  const mutation = useMutation({
    mutationFn: ({ quizId, payload }) =>
      questionsApi.create({ quizId, payload }),
    onSuccess: () => {
      Toastr.success("Question created successfully!");
    },
  });

  return mutation;
};
