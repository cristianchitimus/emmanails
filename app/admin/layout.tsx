export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        [data-site-chrome] { display: none !important; }
        footer { display: none !important; }
        body > .min-h-screen > main.flex-1 { flex: unset !important; }
      `}} />
      {children}
    </>
  );
}
