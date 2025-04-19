import { QUERY_KEY } from "constants/query";

import { Toastr } from "@bigbinary/neetoui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import quizzesApi from "apis/quizzes";
import FileSaver from "file-saver";
import { t } from "i18next";

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: payload => quizzesApi.create(payload),
    onSuccess: () => {
      Toastr.success(t("response.success.quizCreated"));
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

export const useCloneQuiz = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: quizId => quizzesApi.clone(quizId),
    onSuccess: () => {
      Toastr.success(t("response.success.quizCloned"));
      queryClient.invalidateQueries(QUERY_KEY.QUIZZES);
    },
  });

  return mutation;
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: quizId => quizzesApi.destroy(quizId),

    onSuccess: () => {
      Toastr.success(t("response.success.quizDeleted"));
      queryClient.invalidateQueries(QUERY_KEY.QUIZZES);
    },
  });

  return mutation;
};

export const useBulkDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ids => quizzesApi.bulkDelete(ids),

    onSuccess: () => {
      Toastr.success(t("response.success.quizBulkDeleted"));
      queryClient.invalidateQueries(QUERY_KEY.QUIZZES);
    },
  });

  return mutation;
};

export const useBulkUpdate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: payload => quizzesApi.bulkUpdate(payload),

    onSuccess: () => {
      Toastr.success(t("response.success.quizBulkUpdated"));
      queryClient.invalidateQueries(QUERY_KEY.QUIZZES);
    },
  });

  return mutation;
};

export const useCreateReport = () => {
  const mutation = useMutation({
    mutationFn: quizId => quizzesApi.createReport(quizId),
  });

  return mutation;
};

export const useDownloadReport = () => {
  const mutation = useMutation({
    mutationFn: quizId => quizzesApi.downloadReport(quizId),

    onSuccess: (response, quizId) => {
      FileSaver.saveAs(response.data, `submissions-report-${quizId}.pdf`);
    },
  });

  return mutation;
};
