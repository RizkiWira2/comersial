import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppProvider } from "@/contexts/AppContext";
import faviconUrl from "../../Branding/logo-icon.svg?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Comersial — 1-on-1 Commercial Property Investment Services" },
      { name: "description", content: "1-on-1 Commercial Property Investment Services" },
      { name: "author", content: "Comersial Group" },
      { property: "og:title", content: "Comersial — 1-on-1 Commercial Property Investment Services" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: faviconUrl },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
