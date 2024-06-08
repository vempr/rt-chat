/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MONGODB_URI: string;
  readonly VITE_SECRET: string;
  readonly VITE_HASH_SALT_ROUNDS: string;
}
