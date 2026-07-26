import { closeDrawerOnEscape, focusDrawerClose } from './sidebar.helper';
import type { AppSidebarProps } from './sidebar.types';

export function AppSidebar(props: AppSidebarProps): React.JSX.Element {
  return (
    <aside
      id={props.id}
      className="site-sidebar"
      data-open={String(props.isOpen)}
      aria-label={props.label}
      aria-hidden={props.isHidden}
      inert={props.isHidden ? true : undefined}
      role={props.isModal ? 'dialog' : undefined}
      aria-modal={props.isModal ? true : undefined}
      tabIndex={props.isModal ? -1 : undefined}
    >
      <button
        className="site-drawer-close"
        type="button"
        aria-label={props.closeLabel}
        ref={(element) => {
          focusDrawerClose(props.isModal && props.isOpen, element);
        }}
        onClick={props.onClose}
        onKeyDown={(event) => {
          closeDrawerOnEscape(event, props.onClose);
        }}
      >
        <span aria-hidden="true">×</span>
      </button>
      <nav>
        <ul>
          {props.items.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                aria-current={item.path === props.currentPath ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  props.onNavigate(item.path);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="site-sidebar-controls">{props.controls}</div>
    </aside>
  );
}
