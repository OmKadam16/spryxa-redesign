import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Shell from "@/components/Shell";


export const metadata: Metadata = {
  title: "Spryxa — Growth, coordinated.",
  description: "A coordinated growth workspace for strategy, content, campaigns, and performance.",
};

const themeScript = `try{var t=localStorage.getItem('spx-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
