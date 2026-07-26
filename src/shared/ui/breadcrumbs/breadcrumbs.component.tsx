import type { AppBreadcrumbsProps } from './breadcrumbs.types';

export function AppBreadcrumbs(props: AppBreadcrumbsProps): React.JSX.Element {
  return (
    <nav className="site-breadcrumbs" aria-label={props.label}>
      <ol>
        {props.items.map((item) => (
          <li key={item.path}>
            {item.isCurrent ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <a
                href={item.path}
                onClick={(event) => {
                  event.preventDefault();
                  props.onNavigate(item.path);
                }}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
