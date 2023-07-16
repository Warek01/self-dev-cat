export interface ChatInputAreaProps {
  onSendMessage: (text: string, files: File[]) => Promise<void>
}
