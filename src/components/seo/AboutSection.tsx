import { FAQ, HOW_TO_PLAY } from '@/data/site';

/** Crawlable copy under the setup screen. Server-rendered, styled to match the game's ruled grid. */
export function AboutSection() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-12 border-t border-line px-4 py-12 sm:px-6">
      <section className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-[0.25em] text-ink/60">Free imposter game, no download</h2>
        <p className="text-sm leading-relaxed text-ink/80">
          Play Imposter right here in your browser. It is a pass-and-play party word game: everyone gets the same
          secret word except the imposter, who has to bluff their way through. No app store, no sign-up, no cost.
          Just one phone and a group of friends.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-[0.25em] text-ink/60">How to play Imposter</h2>
        <ol className="flex flex-col gap-px border border-line bg-line">
          {HOW_TO_PLAY.map((step, index) => (
            <li key={step} className="flex gap-4 bg-obsidian p-4 text-sm leading-relaxed text-ink/80">
              <span className="font-mono text-accent">{String(index + 1).padStart(2, '0')}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-[0.25em] text-ink/60">FAQ</h2>
        <div className="flex flex-col gap-px border border-line bg-line">
          {FAQ.map(({ question, answer }) => (
            <details key={question} className="group bg-obsidian">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                <h3>{question}</h3>
                <span aria-hidden className="font-mono text-ink/60 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-ink/80">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="text-center font-mono text-xs text-ink/40">Free · No download · No sign-up</footer>
    </div>
  );
}
