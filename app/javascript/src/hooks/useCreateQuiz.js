import { Toastr } from "@bigbinary/neetoui";
import { useMutation } from "@tanstack/react-query";
// import { useHistory } from "react-router-dom";

import quizzesApi from "../apis/quizzes";

const useCreateQuiz = () => {
  // const history = useHistory();

  const mutation = useMutation({
    mutationFn: payload => quizzesApi.create(payload),
    onSuccess: () => {
      Toastr.success("Quiz created successfully!");
    },
    onError: error => {
      Toastr.error(error?.response?.data?.error || "Failed to create quiz.");
    },
  });

  return mutation; // ✅ Return the full mutation object including isLoading
};

export default useCreateQuiz;
