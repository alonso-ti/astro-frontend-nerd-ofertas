/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_DB_SERVICE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cloudflare runtime types
interface CloudflareRuntime {
  env: {
    ANALYTICS?: AnalyticsEngineDataset;
    KV?: KVNamespace;
    DB_SERVICE?: any;
  };
}

declare namespace App {
  interface Locals extends CloudflareRuntime {
    runtime: CloudflareRuntime;
  }
}
