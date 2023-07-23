export const mapRouteParams = (
  route: string,
  paramValues: Record<string, string | number>,
): string => {
  let parsedRoute = route

  Object.entries(paramValues).map(([key, value]) => {
    parsedRoute = parsedRoute.replace(`:${key}`, value.toString())
  })

  return parsedRoute
}
