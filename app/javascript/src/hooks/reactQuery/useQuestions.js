import { Toastr } from "@bigbinary/neetoui";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

import questionsApi from "../../apis/questions";
import { QUERY_KEY } from "../../constants/query";

export const useFetchQuestions = quizId =>
  useQuery({
    queryKey: [QUERY_KEY.QUESTIONS, quizId],
    queryFn: () => questionsApi.fetch(quizId),
  });

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ quizId, payload }) =>
      questionsApi.create({ quizId, payload }),
    onSuccess: () => {
      Toastr.success(t("response.success.questionCreated"));
      queryClient.invalidateQueries(QUERY_KEY.QUESTIONS);
    },
  });

  return mutation;
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: questionId => questionsApi.destroy(questionId),
    onSuccess: () => {
      Toastr.success(t("response.success.questionDeleted"));
      queryClient.invalidateQueries(QUERY_KEY.QUESTIONS);
    },
  });

  return mutation;
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ questionId, payload }) =>
      questionsApi.update({ questionId, payload }),
    onSuccess: () => {
      Toastr.success(t("response.success.questionUpdated"));
      queryClient.invalidateQueries(QUERY_KEY.QUESTIONS);
    },
  });

  return mutation;
};

export const useShowQuestion = questionId =>
  useQuery({
    queryKey: [QUERY_KEY.QUESTION, questionId],
    queryFn: () => questionsApi.show(questionId),
  });

export const useCloneQuestion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: questionId => questionsApi.clone(questionId),
    onSuccess: () => {
      Toastr.success(t("response.success.questionCloned"));
      queryClient.invalidateQueries(QUERY_KEY.QUESTIONS);
    },
  });

  return mutation;
};
