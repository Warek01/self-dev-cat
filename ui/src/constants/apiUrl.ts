const BASE = import.meta.env.VITE_API_URL

export const apiUrl: Record<string, Record<string, Function>> = {
  user: {
    create: () => `${BASE}/user/create`,
    getCurrent: () => `${BASE}/user`,
    get: (userId: string) => `${BASE}/user/get/${userId}`,
    removeFriend: () => `${BASE}/user/remove-friend`,
    login: () => `${BASE}/user/login`,
    friends: (userId: string) => `${BASE}/user/${userId}/friends`,
    getAll: () => `${BASE}/user/get`,
  },

  blog: {},

  friendRequest: {
    send: (userId: string) => `${BASE}/friend-request/send/${userId}`,
    accept: (requestId: string) => `${BASE}/friend-request/accept/${requestId}`,
    deny: (requestId: string) => `${BASE}/friend-request/deny/${requestId}`,
    user: () => `${BASE}/friend-request/user`,
  },

  message: {
    all: () => `${BASE}/message/all`,
    get: (messageId: string) => `${BASE}/message/get/${messageId}`,
  },

  messageGroup: {
    all: () => `${BASE}/message-group/all`,
    getOne: (messageGroupId: string) =>
      `${BASE}/message-group/${messageGroupId}`,
    post: () => `${BASE}/message-group`,
  },

  attachment: {
    fromMessage: () => `${BASE}/attachment/from-message`,
    get: (attachmentId: string) => `${BASE}/attachment/get/${attachmentId},`,
  },

  image: {
    postImage: () => `${BASE}/image/post-image`,
  },
}
