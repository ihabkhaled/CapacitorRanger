import type { SiteFooterProps } from './site-footer.types';

export function SiteFooter(props: SiteFooterProps): React.JSX.Element {
  return (
    <footer className="site-footer">
      <div>
        <strong>{props.brandLabel}</strong>
        <p>{props.tagline}</p>
      </div>
      <nav aria-label={props.exploreLabel}>
        <strong>{props.exploreLabel}</strong>
        {props.exploreLinks.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              props.onNavigate(item.path);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <nav aria-label={props.productLabel}>
        <strong>{props.productLabel}</strong>
        {props.productLinks.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              props.onNavigate(item.path);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <p>{props.builtWith}</p>
    </footer>
  );
}
