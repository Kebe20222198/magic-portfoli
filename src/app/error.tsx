"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
        Une erreur est survenue
      </h2>
      <p className="text-text-secondary dark:text-text-secondary-dark mb-6 max-w-md">
        {error.message || "Quelque chose s'est mal passé. Veuillez réessayer."}
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-xl bg-stone-900 dark:bg-indigo-600 text-white font-semibold text-sm hover:bg-stone-800 dark:hover:bg-indigo-500 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
