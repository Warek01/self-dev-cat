export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
  realName?: string
}

export interface AuthenticatedUser {
  id: string
  username: string
  email: string
  password: string
  realName?: string
}
