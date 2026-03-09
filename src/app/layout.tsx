import { Footer } from "@/components/footer";
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
        className="antialiased flex flex-col bg-[#f5f5f5] min-h-screen"
      >
        <Toaster richColors position="bottom-right"/>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
