export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block w-8 h-8 border-2 border-dark-200 border-t-pink rounded-full animate-spin" />
        <p className="font-body text-xs uppercase tracking-widest text-dark-400">
          Se încarcă...
        </p>
      </div>
    </div>
  );
}
