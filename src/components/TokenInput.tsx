"use client";

import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  onTokenSubmit: (token: string) => void;
}

export default function TokenInput({ onTokenSubmit }: Props) {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get("token") as string;
    if (token) {
      localStorage.setItem('github_token', token);
      onTokenSubmit(token);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="w-full">
        <label htmlFor="token" className="block text-sm font-medium text-gray-300 mb-2">
          GitHub Personal Access Token
        </label>
        <input
          type="text"
          id="token"
          name="token"
          placeholder="ghp_xxxxxxxxxxxxxx"
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-2">
          Create a token with{" "}
          <span className="text-purple-400">read:user</span>
          {" "}
          and{" "}
          <span className="text-purple-400">repo</span>
          {" "}
          scopes at{" "}
          <a
            href="https://github.com/settings/tokens/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline"
          >
            GitHub Settings
          </a>
        </p>
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-3 text-white bg-[#24292F] rounded-lg hover:bg-[#24292F]/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full justify-center"
      >
        <Github className="w-5 h-5" />
        <span>Enter with Token</span>
      </button>
    </form>
  );
}
