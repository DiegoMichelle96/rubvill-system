import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
  title: { default: "RUBVILL", template: "%s · RUBVILL" },
  description: "Herramientas para contadores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
