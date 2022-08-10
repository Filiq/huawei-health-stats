export default function MainLayout({ children }) {
  return (
    <main className="p-8 min-h-screen flex justify-center items-center">
      {children}
    </main>
  );
}
