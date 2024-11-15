import { ThemeProvider as MaterialThemeProvider } from '@material-tailwind/react';

export default function MainLayout({ children }: any) {
  return (
    <MaterialThemeProvider>
      <div>Header {children}</div>
    </MaterialThemeProvider>
  );
}
