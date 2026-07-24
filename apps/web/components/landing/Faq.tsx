const faqs = [
  {
    q: 'Is Northbeam a bank?',
    a: 'No. Northbeam is a financial technology company. Deposits are held at a partner bank and covered by FDIC insurance up to the standard limit.',
  },
  {
    q: 'How fast do transfers post?',
    a: 'Domestic wires post the same business day. ACH transfers typically post within one business day, both ways.',
  },
  {
    q: 'Can I set spend limits per teammate?',
    a: 'Yes — the Growth and Scale plans include role-based approvals and per-seat spend limits, enforced automatically at the transaction level.',
  },
  {
    q: 'What happens to my data if I close my account?',
    a: 'You can export your full transaction history and statements at any time. We retain records as required by financial regulation, then delete on schedule.',
  },
];

export function Faq() {
  return (
    <section className="border-t border-line px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl">Questions, answered plainly.</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-left text-base font-medium">
                {f.q}
                <span className="ml-4 text-brass transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
