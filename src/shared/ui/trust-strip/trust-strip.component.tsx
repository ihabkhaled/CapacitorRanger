import type { TrustStripProps } from './trust-strip.types';

export function TrustStrip(props: TrustStripProps): React.JSX.Element {
  return (
    <section className="site-trust-strip" aria-label={props.label}>
      <p>{props.intro}</p>
      <ul>
        {props.brands.map((brand) => (
          <li key={brand}>{brand}</li>
        ))}
      </ul>
    </section>
  );
}
