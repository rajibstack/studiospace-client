import Link from "next/link";
import { FolderSearch, PlusCircle, ArrowRight } from "lucide-react";

export default function EmptyState({
  title = "No results found",
  description = "We couldn't find what you're looking for. Try adjusting your filters or explore other creative spaces.",
  actionLabel = "Explore Studios",
  actionHref = "/studios",
  icon: Icon = FolderSearch,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl max-w-2xl mx-auto my-10">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
        <div className="relative p-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-amber-500 shadow-inner">
          <Icon className="w-8 h-8" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {actionHref && (
        <Link
          href={actionHref}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
        >
          {actionLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}