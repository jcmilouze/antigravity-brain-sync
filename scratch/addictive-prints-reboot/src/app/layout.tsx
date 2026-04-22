import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Addictive Prints | Précision Addictive',
  description: 'Accessoires pour artisans et bricoleurs exigeants. Où l\'artisanat rencontre la technologie.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
