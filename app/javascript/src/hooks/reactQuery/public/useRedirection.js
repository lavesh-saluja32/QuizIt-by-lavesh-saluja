import { useQuery, useMutation } from "@tanstack/react-query";
import redirectionsApi from "apis/public/redirection";
export const useRedirect = () =>
  useMutation({
    mutationFn: payload => redirectionsApi.redirect(payload),
    onError: ({ response: { status, data } }) => {
      console.log(data);
      if (status == 301) window.location.replace(data.redirect_url);
    },
  });
