// app/ramadan/layout.tsx fayli ichiga yoziladi:
export default function RamadanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ramadan-exclusive-layout bg-[#020202]">
      {children}
    </div>
  );
}