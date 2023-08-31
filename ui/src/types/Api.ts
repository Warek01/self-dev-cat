export interface ApiFindResponse<T> {
  items: T[]
  count: number
}

export type ApiPaginationRequest<T extends {} = {}> = T & {
  skip?: number
  limit?: number
}
