import { ACCENT_COLOR, BRAND_COLOR } from '@/data/site';

/** Shared mark for generated icons: a cyan question mark in a ruled square. */
export function BrandMark({ size }: { readonly size: number }) {
  const inset = Math.round(size * 0.12);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: BRAND_COLOR, padding: inset }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `${Math.max(2, Math.round(size * 0.03))}px solid ${ACCENT_COLOR}`,
          color: ACCENT_COLOR,
          fontSize: Math.round(size * 0.5),
          fontWeight: 700,
          fontFamily: 'monospace',
        }}
      >
        ?
      </div>
    </div>
  );
}
