const BASE: string = import.meta.env.VITE_API_URL

export const apiUrl = {
  auth: {
    login: () => `${BASE}/auth/login`,
    register: () => `${BASE}/auth/register`,
  },

  user: {
    get: (userId: string) => `${BASE}/user/get/${userId}`,
    removeFriend: () => `${BASE}/user/remove-friend`,
    friends: (userId: string) => `${BASE}/user/${userId}/friends`,
    nonFriends: () => `${BASE}/user/non-friends`,
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
} as const
