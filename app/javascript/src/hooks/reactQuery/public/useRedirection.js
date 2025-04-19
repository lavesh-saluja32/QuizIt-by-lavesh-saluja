import { useQuery, useMutation } from "@tanstack/react-query";
import redirectionsApi from "apis/public/redirection";
export const useRedirect = () =>
  useMutation({
    mutationFn: payload => redirectionsApi.redirect(payload),
    onError: ({ response: { status, data } }) => {
      console.log(status, data);
      if (status == 301) window.location.href = data.redirect_url;
    },
  });
