import { DOMAIN } from "./Form/constants";

export const extractDomain = url => {
  try {
    const parsed = new URL(url);

    return parsed.origin;
  } catch {
    return null;
  }
};

export const isLikelyPath = input =>
  !input.startsWith("http:/") &&
  !input.startsWith("https:/") &&
  !input.startsWith("www.");

export const getFromUrl = value => {
  let path = value.trim();
  if (path.startsWith(DOMAIN)) {
    path = path.replace(DOMAIN, "");
  }

  const fullUrl = `${DOMAIN}${path.startsWith("/") ? "" : "/"}${path}`;
  const isValid = extractDomain(fullUrl) === DOMAIN;

  return { fullUrl, isValid };
};

export const hasSubdomain = value => /^[a-zA-Z0-9-]+\./.test(value.trim());

export const getToUrl = value => {
  const trimmedValue = value.trim();
  const usePrefix = !hasSubdomain(trimmedValue) && isLikelyPath(trimmedValue);

  const fullUrl = usePrefix
    ? `${DOMAIN}${trimmedValue.startsWith("/") ? "" : "/"}${trimmedValue}`
    : trimmedValue;

  const isValid = extractDomain(fullUrl) === DOMAIN;

  return { fullUrl, isValid };
};
