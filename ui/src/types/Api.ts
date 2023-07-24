export interface ApiFindResponse<T> {
  items: T[]
  count: number
}

export type ApiPaginationRequest<T extends object> = T & {
  skip?: number
  limit?: number
}
