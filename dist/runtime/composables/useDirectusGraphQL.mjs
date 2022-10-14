import { useDirectusUrl } from "./useDirectusUrl.mjs";
export const useDirectusGraphQL = (query, variables) => {
  let url = useDirectusUrl();
  url = url.replace(/\/$/, "");
  return $fetch(`${url}/graphql`, {
    method: "POST",
    body: JSON.stringify({ query, ...variables && { variables } })
  });
};
