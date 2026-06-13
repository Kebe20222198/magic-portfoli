import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h2 className="text-5xl font-extrabold text-stone-900 dark:text-indigo-400 mb-4">
        404
      </h2>
      <p className="text-lg text-text-secondary dark:text-text-secondary-dark mb-6">
        Page introuvable.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-stone-900 dark:bg-indigo-600 text-white font-semibold text-sm hover:bg-stone-800 dark:hover:bg-indigo-500 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
