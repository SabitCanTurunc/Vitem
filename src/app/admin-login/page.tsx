"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Hatalı şifre. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-vitem-50 flex items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <div className="bg-white border border-vitem-200 p-10">
          <div className="text-center mb-10">
            <span className="font-serif text-3xl tracking-[0.25em] font-light text-vitem-900">VITEM</span>
            <span className="block text-[9px] tracking-widest text-vitem-400 mt-2 uppercase">Yönetim Paneli</span>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 border border-vitem-200 flex items-center justify-center">
              <Lock className="w-5 h-5 text-vitem-400" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-vitem-500">Şifre</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-b border-vitem-300 py-3 pr-10 text-sm focus:outline-none focus:border-vitem-900 transition-colors bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-vitem-400 hover:text-vitem-700 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-vitem-900 text-white py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-vitem-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
