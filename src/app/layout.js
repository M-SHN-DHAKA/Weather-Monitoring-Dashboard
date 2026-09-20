import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata = {
  title: 'Weather Monitoring Dashboard',
  description: 'A Next.js Weather Monitoring Dashboard, Created by OpenWeatherMap API',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
