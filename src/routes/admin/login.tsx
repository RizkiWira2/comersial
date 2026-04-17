import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import logoFull from "@/assets/logo-full.svg";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login — Comersial" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      navigate({ to: "/admin" });
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md px-6 z-10">
        <div className="text-center mb-10 animate-fade-in">
          <div className="mb-10 animate-fade-in flex justify-center">
            <img src={logoFull} alt="Commercial Logo" className="h-10 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground mt-2 font-medium tracking-wide">Secure Administrator Portal</p>
        </div>

        <div className="glass-card rounded-3xl border border-border bg-card/50 p-8 shadow-2xl backdrop-blur-xl animate-scale-up">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-center gap-2 animate-shake">
                <div className="w-1 h-1 rounded-full bg-destructive" />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@commercial.com"
                  required
                  className="w-full rounded-2xl border border-border bg-background/50 pl-11 pr-4 py-3.5 text-sm text-foreground outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-2xl border border-border bg-background/50 pl-11 pr-4 py-3.5 text-sm text-foreground outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group mt-4 relative overflow-hidden rounded-2xl bg-foreground py-4 text-sm font-bold text-background transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign Into Portal
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold-dark opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </form>
        </div>
        
        <p className="text-center text-[10px] text-muted-foreground mt-8 uppercase tracking-[0.3em] font-medium opacity-50">
          Commercial Investment Group &copy; 2026
        </p>
      </div>
    </div>
  );
}
