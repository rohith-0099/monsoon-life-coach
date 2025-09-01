export default function GoldenHourCard(props: { windows: { start: string; end: string }[] }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium">Golden Hour</h3>
      <div className="mt-2 space-y-1 text-sm">
        {props.windows.map((w, i) => (
          <div key={i}>
            {new Date(w.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
            {new Date(w.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        ))}
      </div>
    </div>
  );
}
