export interface Message {
  id: string
  user: {
    id: number
  }
  content?: string
  type: string
  fileNames: string[]
  replies: Message[]
  repliesTo: Message
  createdAt: string
  updatedAt: string
}
