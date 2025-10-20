export async function getOptions(): Promise<any> {
  const token = await localStorage.getItem("auth");
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  };
}

export const queryBuilder = (obj: object) => {
  return Object.entries(obj)?.reduce(
    (queryString, [key, value], index, array) => {
      const separator = index === array?.length - 1 ? "" : "&";
      return `${queryString}${key}=${value}${separator}`;
    },
    "",
  );
};
