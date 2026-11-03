export function SkeletonCard() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl animate-pulse space-y-4">
      <div className="w-full h-40 bg-neutral-800 rounded-xl" />
      <div className="flex justify-between items-center">
        <div className="w-24 h-6 bg-neutral-800 rounded-full" />
        <div className="w-16 h-6 bg-neutral-800 rounded-md" />
      </div>
      <div className="w-3/4 h-6 bg-neutral-800 rounded-md" />
      <div className="w-1/2 h-4 bg-neutral-800 rounded-md" />
      <div className="pt-4 border-t border-neutral-800 flex justify-end">
        <div className="w-28 h-9 bg-neutral-800 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}