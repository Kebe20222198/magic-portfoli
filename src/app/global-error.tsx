"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="font-mono antialiased min-h-screen bg-white dark:bg-[#0b1120]">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
            Erreur critique
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-md">
            {error.message ||
              "Une erreur inattendue s'est produite. Veuillez rafraîchir la page."}
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-stone-900 dark:bg-indigo-600 text-white font-semibold text-sm hover:bg-stone-800 dark:hover:bg-indigo-500 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
