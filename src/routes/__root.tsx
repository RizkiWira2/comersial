import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppProvider } from "@/contexts/AppContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
