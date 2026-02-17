import "./globals.css"
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-[#eeeeee]"
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
