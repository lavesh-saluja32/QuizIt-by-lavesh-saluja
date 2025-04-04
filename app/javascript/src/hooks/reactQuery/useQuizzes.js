import { Toastr } from "@bigbinary/neetoui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

import quizzesApi from "../../apis/quizzes";
import { QUERY_KEY } from "../../constants/query";

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: payload => quizzesApi.create(payload),
    onSuccess: () => {
      Toastr.success("Quiz created successfully!");
      queryClient.invalidateQueries(QUERY_KEY.QUIZZES);
    },
  });

  return mutation;
};

export const useFetchQuizzes = params =>
  useQuery({
    queryKey: [QUERY_KEY.QUIZZES, params],
    queryFn: () => quizzesApi.fetch(params),
  });

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: payload => quizzesApi.update(payload),
    onSuccess: () => {
      Toastr.success(t("response.success.quizUpdated"));
      queryClient.invalidateQueries([QUERY_KEY.QUIZZES, QUERY_KEY.QUIZ]);
    },
  });

  return mutation;
};

export const useShowQuiz = quizId =>
  useQuery({
    queryKey: [QUERY_KEY.QUIZ, quizId],
    queryFn: () => quizzesApi.show(quizId),
  });
