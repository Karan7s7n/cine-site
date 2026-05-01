export default function PlaceholderSection({ title }: { title: string }) {
  return (
    <section className="section-spacing flex items-center justify-center border-b border-white/5">
      <h2 className="text-6xl md:text-8xl font-semibold glow-text opacity-20">{title}</h2>
    </section>
  )
}
