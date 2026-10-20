import { ImageResponse } from 'next/og';
import { ACCENT_COLOR, BRAND_COLOR } from '@/data/site';

export const alt = 'Play Imposter online free. No download, one phone.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          background: BRAND_COLOR,
          color: '#f5f5f5',
          border: `2px solid #333333`,
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 12, color: 'rgba(245,245,245,0.6)' }}>
          PARTY WORD GAME
        </div>
        <div style={{ display: 'flex', fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>Play Imposter</div>
        <div
          style={{
            display: 'flex',
            padding: '16px 40px',
            border: `2px solid ${ACCENT_COLOR}`,
            color: ACCENT_COLOR,
            fontSize: 36,
            letterSpacing: 6,
          }}
        >
          FREE · NO DOWNLOAD · ONE PHONE
        </div>
      </div>
    ),
    size,
  );
}
