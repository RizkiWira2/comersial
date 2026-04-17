import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import logoFull from "@/assets/logo-full.svg";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { LogOut, LayoutDashboard, Globe } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      
      setUser(session?.user ?? null);
      setLoading(false);

      const isLoginPath = window.location.pathname.includes("/login");
      if (!session && !isLoginPath) {
        navigate({ to: "/admin/login" });
      } else if (session && isLoginPath) {
        navigate({ to: "/admin" });
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        const isLoginPath = window.location.pathname.includes("/login");
        if (!session && !isLoginPath) {
          navigate({ to: "/admin/login" });
        }
      }
    });

    checkSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const isLoginPage = typeof window !== 'undefined' && window.location.pathname.includes("/login");

  if (loading && !isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {user && (
        <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <img src={logoFull} alt="Commercial Logo" className="h-6 w-auto" />
              </div>
              
              <nav className="hidden md:flex items-center gap-1 font-medium text-xs">
                <a 
                  href="/" 
                  target="_blank" 
                  className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all flex items-center gap-2"
                >
                  <Globe size={14} /> View Website
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-foreground">{user.email?.split('@')[0]}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{user.role || 'Administrator'}</span>
              </div>
              
              <div className="h-8 w-[1px] bg-border mx-2 hidden sm:block" />
              
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate({ to: "/admin/login" });
                }}
                className="p-2 rounded-xl bg-muted/50 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
