import { Footer } from "@/components/footer";
import "./globals.css"
import { Header } from "@/components/header"
import { Toaster } from 'sonner'
import { Suspense } from "react";

export const metadata = {
  title: {
    default: "King Imports | O Melhor dos Importados Premium",
    template: "%s | King Imports"
  },
  description: "Encontre relógios, acessórios e eletrônicos de primeira linha com o melhor custo-benefício do Brasil. Qualidade premium e entrega garantida.",
  keywords: ["importados", "primeira linha", "acessórios premium", "king imports", "relógios importados"],
  authors: [{ name: "King Imports" }],
  openGraph: {
    title: "King Imports | Estilo e Qualidade",
    description: "Produtos de primeira linha selecionados a dedo. O luxo ao seu alcance.",
    url: "https://kingimport.com.br",
    siteName: "King Imports",
    images: [
      {
        url: "/logoMeta.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: '/icon.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-apple.png', sizes: '150x150', type: 'image/png' },
    ],
  }
}

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
        <Suspense fallback={<div className="h-20" />}> 
          <Header />
        </Suspense>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
