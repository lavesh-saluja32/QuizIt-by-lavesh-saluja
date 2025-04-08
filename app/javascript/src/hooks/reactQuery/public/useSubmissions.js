import { useMutation } from "@tanstack/react-query";
import submissionsApi from "../../../apis/public/submissions";
import { Toastr } from "neetoui/index";
export const useCreateSubmission = () =>
  useMutation({
    mutationFn: payload => submissionsApi.create(payload),
  });

export const useUpdateSubmission = () =>
  useMutation({
    mutationFn: ({ submissionId, payload }) =>
      submissionsApi.update({ submissionId, payload }),
  });
