import icons from '@icons'

export const attachmentIconMap: Record<string, IconComponent> = {
  'image/': icons.Image,
  'text/': icons.TextFile,
  'application/pdf': icons.Pdf,
  'application/epub+zip': icons.Pdf,
  'video/': icons.FileVideo,
  'audio/': icons.FileMusic,
  'application/vnd.ms-excel': icons.FileExcel,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': icons.FileExcel,
  'application/zip': icons.Archive,
  'application/vnd.rar': icons.Archive,
  'application/x-tar': icons.Archive,
  'application/gzip': icons.Archive,
  'application/vnd.ms-fontobject': icons.Font,
  'font/': icons.Font,
  'application/msword': icons.FileWord,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': icons.FileWord,
  'application/vnd.ms-powerpoint': icons.FilePpt,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': icons.FilePpt,
  'unknown': icons.File,
}
