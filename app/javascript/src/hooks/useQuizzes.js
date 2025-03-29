import { Toastr } from "@bigbinary/neetoui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import { useHistory } from "react-router-dom";
import quizzesApi from "../apis/quizzes";
import { QUERY_KEY } from "../constants/query";

export const useCreateQuiz = () => {
  // const history = useHistory();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: payload => quizzesApi.create(payload),
    onSuccess: () => {
      Toastr.success("Quiz created successfully!");
      queryClient.invalidateQueries(QUERY_KEY.QUIZZES);
    },
    onError: error => {
      Toastr.error(error?.response?.data?.error || "Failed to create quiz.");
    },
  });

  return mutation;
};

export const useFetchQuizzes = params =>
  useQuery({
    queryKey: [QUERY_KEY.QUIZZES, params],
    queryFn: () => quizzesApi.fetch(params),
  });
