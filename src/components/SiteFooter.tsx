import { footer, site } from "@/lib/content";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface py-14">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold">
                {site.name}
              </span>
            </div>
            <p className="measure mt-4 text-ink-600">{footer.blurb}</p>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink-900">
                {column.title}
              </h2>
              <ul className="mt-3 space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-ink-600 transition-colors duration-[var(--duration-fast)] hover:text-ink-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="measure text-sm text-ink-500">{footer.disclaimer}</p>
          <p className="mt-3 text-sm text-ink-500">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
