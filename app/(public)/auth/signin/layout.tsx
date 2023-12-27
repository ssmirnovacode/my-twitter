export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen  items-center justify-center m-auto  ">
      {children}
    </main>
  );
}
