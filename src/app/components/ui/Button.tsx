export default function Button({
  children,
  type = "button",
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className="w-full py-3 rounded-full border border-white/20 hover:bg-white/10 transition"
    >
      {children}
    </button>
  );
};