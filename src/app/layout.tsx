import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Playfair_Display, Syne, Montserrat, Syncopate } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { SmoothScroll } from "@/components/smooth-scroll";
import { UmamiAnalytics } from "@/components/umami-analytics";
import { TimeWidget } from "@/components/time-widget";
import CosmicBackdrop from "@/components/cosmic-backdrop";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable,
          bebasNeue.variable,
          playfair.variable,
          syne.variable,
          montserrat.variable,
          syncopate.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <SmoothScroll>
              {/* Scroll-Driven Dynamic Background */}
              <div className="fixed inset-0 pointer-events-none z-0">
                <CosmicBackdrop />
              </div>

              <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-10 pointer-events-none">
                <FlickeringGrid
                  className="h-full w-full animate-in fade-in duration-700"
                  squareSize={2}
                  gridGap={2}
                  color="rgb(30, 70, 140)"
                  maxOpacity={0.35}
                  style={{
                    maskImage: "linear-gradient(to bottom, black, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                  }}
                />
              </div>
              <div
                className="relative z-20 mx-auto w-full min-w-0 max-w-2xl
                  pt-[max(3rem,calc(env(safe-area-inset-top,0px)+2rem))]
                  pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]
                  px-[max(1rem,env(safe-area-inset-left,0px))]
                  sm:pt-[max(4rem,calc(env(safe-area-inset-top,0px)+2.75rem))]
                  sm:pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))]
                  sm:px-[max(1.5rem,env(safe-area-inset-left,0px))]
                  lg:px-[max(2rem,env(safe-area-inset-left,0px))]"
              >
                {children}
              </div>
              <TimeWidget />
              <Navbar />
            </SmoothScroll>
          </TooltipProvider>
        </ThemeProvider>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
