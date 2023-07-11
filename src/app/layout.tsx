import './globals.css';
import { Roboto } from 'next/font/google';

import { ThemeProvider } from '~/components';

const globalFontFamily = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: 'Replenishment Manager',
  description: 'Web application to replenishment control.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={globalFontFamily.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
