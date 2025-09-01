export default function PackList({ items }: { items: string[] }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium">What to pack</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((it, i) => (
          <span key={i} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
