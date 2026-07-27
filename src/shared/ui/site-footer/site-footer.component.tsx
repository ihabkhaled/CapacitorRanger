import type { SiteFooterProps } from './site-footer.types';

function renderFooterNavigation(
  label: string,
  links: SiteFooterProps['exploreLinks'],
  onNavigate: SiteFooterProps['onNavigate'],
): React.JSX.Element {
  return (
    <nav aria-label={label}>
      <strong>{label}</strong>
      {links.map((item) => (
        <a
          key={item.path}
          href={item.path}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(item.path);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function SiteFooter(props: SiteFooterProps): React.JSX.Element {
  return (
    <footer className="site-footer">
      <div>
        <strong>{props.brandLabel}</strong>
        <p>{props.tagline}</p>
      </div>
      {renderFooterNavigation(props.exploreLabel, props.exploreLinks, props.onNavigate)}
      {renderFooterNavigation(props.productLabel, props.productLinks, props.onNavigate)}
      <p>{props.builtWith}</p>
    </footer>
  );
}
