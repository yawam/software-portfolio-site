// Animated badge to signal availability for new roles
export default function OpenToHire() {
  return (
    <div className="flex h-[50px] w-[300px] animate-pulse items-center justify-center rounded-full bg-emerald-600/20 shadow-2xl shadow-green-900">
      <div className="flex h-[30px] w-[280px] items-center justify-center rounded-full bg-green-700">
        <p className="text-center tracking-widest">Open to work</p>
      </div>
    </div>
  );
}
