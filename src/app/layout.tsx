import "./globals.css"
import { Header } from "@/components/header"
import { Toaster } from 'sonner'

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
        <Toaster richColors position="bottom-right"/>
        <Header/>
        {children}
      </body>
    </html>
  );
}
