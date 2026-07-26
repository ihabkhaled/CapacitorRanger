import type { AppNavbarProps } from './navbar.types';

export function AppNavbar(props: AppNavbarProps): React.JSX.Element {
  return (
    <header className="site-navbar" data-testid={props.testId}>
      <button
        className="site-brand"
        type="button"
        onClick={() => {
          props.onNavigate(props.brandPath);
        }}
      >
        <span className="site-brand-mark" aria-hidden="true" />
        <span>{props.brandLabel}</span>
      </button>
      <nav className="site-navbar-links" aria-label={props.navigationLabel}>
        {props.items.map((item) => (
          <a
            key={item.path}
            href={item.path}
            aria-current={item.path === props.currentPath ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault();
              props.onNavigate(item.path);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="site-navbar-actions">{props.actions}</div>
      <button
        className="site-menu-toggle"
        type="button"
        aria-label={props.menuLabel}
        aria-expanded={props.menuExpanded}
        aria-controls={props.menuControls}
        onClick={props.onMenuToggle}
        data-testid={props.menuTestId}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </header>
  );
}
