export const bearer = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

export const basic = (username: string, password: string) => ({
  Authorization: `Basic ${btoa(`${username}:${password}`)}`,
})
