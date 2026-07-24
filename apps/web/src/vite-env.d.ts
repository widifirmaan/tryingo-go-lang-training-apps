/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXECUTION_WORKER_URL?: string;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
