declare global {
  interface Window {
    registerFilePreviewer(previewer: any): void;
  }
}

export {};