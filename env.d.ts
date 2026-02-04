// Fix for "Cannot find type definition file for 'vite/client'"
// Manually declare process.env as it is polyfilled by Vite for API_KEY usage.

declare const process: {
  env: {
    API_KEY: string;
    [key: string]: string | undefined;
  };
};
