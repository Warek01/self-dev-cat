declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_PUBLIC_API_URL: string
    }
  }
}

export {}
