export const getId = (urlPath: string) => {
  const result = urlPath.match(/([^\/]*)\/*$/) || [];
  return result[0];
}
