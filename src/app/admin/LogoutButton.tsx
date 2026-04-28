"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@api/actions/authActions";

export default function LogoutButton({ label = "Cikis Yap" }: { label?: string }) {
  const router = useRouter();

  async function handleLogout() {
    await logoutAdmin();
    router.push("/admin-login");
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
    >
      <LogOut className="w-4 h-4 shrink-0" />
      {label}
    </button>
  );
}
