/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime { }
}

interface Env {
  API_GATEWAY: Fetcher;
  ASSETS: Fetcher;
  DB_SERVICE: Service<import("@nerd-ofertas/types").DbServiceRpc>;
}
