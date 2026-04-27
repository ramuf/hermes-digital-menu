import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Digital Menu',
    short_name: 'DigitalMenu',
    description: 'Localized Digital Menu for your favorite restaurant',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ea580c', // orange-600
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
