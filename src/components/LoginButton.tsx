"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginButton() {
  const { data: session } = useSession();
  const { t } = useLanguage();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <img
          src={session.user?.image ?? ""}
          alt={session.user?.name ?? "User"}
          className="w-10 h-10 rounded-full border-2 border-gray-700"
        />
        <div className="hidden md:block">
          <p className="text-sm font-medium text-white">{session.user?.name}</p>
          <p className="text-xs text-gray-400">{t.login.loggedIn}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
        >
          {t.login.signOut}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="flex items-center gap-2 px-6 py-3 text-white bg-[#24292F] rounded-lg hover:bg-[#24292F]/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      <Github className="w-5 h-5" />
      <span>{t.login.button}</span>
    </button>
  );
}
