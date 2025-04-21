import { useMutation, useQuery } from "@tanstack/react-query";
import submissionsApi from "apis/public/submissions";
import { QUERY_KEY } from "constants/query";
export const useCreateSubmission = () =>
  useMutation({
    mutationFn: payload => submissionsApi.create(payload),
  });

export const useUpdateSubmission = () =>
  useMutation({
    mutationFn: ({ submissionId, payload }) =>
      submissionsApi.update({ submissionId, payload }),
  });

export const useShowSubmission = submissionId =>
  useQuery({
    queryKey: [QUERY_KEY.SUBMISSION],
    queryFn: () => submissionsApi.show(submissionId),
  });
