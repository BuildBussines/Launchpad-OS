export default function CTASection() {
  return (
    <section className="border-b border-line2 bg-panel py-20">
      <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-text-hi sm:text-3xl">
            Day one starts whenever you're ready.
          </h2>
          <p className="mt-2 max-w-[50ch] text-text-lo">
            Get instant access to the full sequence and start today.
          </p>
        </div>
        <a
          href="#pricing"
          className="whitespace-nowrap rounded-sm bg-amber px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          See pricing
        </a>
      </div>
    </section>
  );
}
