import { useMutation } from "@tanstack/react-query";
import submissionsApi from "../../../apis/public/submissions";
export const useCreateSubmission = () =>
  useMutation({
    mutationFn: payload => submissionsApi.create(payload),
  });
