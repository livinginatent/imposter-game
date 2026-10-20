import type { MetadataRoute } from 'next';
import { BRAND_COLOR, SITE_DESCRIPTION, SITE_NAME } from '@/data/site';

/** Lets players "Add to Home Screen" for app-like launches without an app store download. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} – Party Word Game`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: BRAND_COLOR,
    theme_color: BRAND_COLOR,
    categories: ['games', 'entertainment'],
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
