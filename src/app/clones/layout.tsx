export const metadata = {
  title: "Clones",
  description: "Browse and view all clone projects.",
};

// Minimal layout wrapper so clone routes inherit metadata
export default function CloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
