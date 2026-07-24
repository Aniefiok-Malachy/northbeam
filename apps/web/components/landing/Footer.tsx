const columns = [
  {
    title: 'Product',
    links: ['Accounts', 'Transfers', 'Cards', 'Reporting'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Security', 'Press'],
  },
  {
    title: 'Resources',
    links: ['Help center', 'API docs', 'Status', 'Guides'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Disclosures'],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <p className="font-display text-xl">Northbeam</p>
            <p className="mt-3 max-w-xs text-sm text-paper/60">
              One ledger for every account, transfer, and dollar your business moves.
            </p>

            <form className="mt-6 flex max-w-xs gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm placeholder:text-paper/35"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-brass px-3 py-2 text-sm font-medium text-ink"
              >
                Subscribe
              </button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-paper/80">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-paper/55 hover:text-paper">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Northbeam. Not a bank; deposits held by a partner bank, member FDIC.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-paper/70">Twitter</a>
            <a href="#" className="hover:text-paper/70">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
