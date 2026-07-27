import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import OfferPopup from "@/components/OfferPopup";
import Preloader from "@/components/anim/Preloader";
import PageTransition from "@/components/anim/PageTransition";
import NoiseOverlay from "@/components/anim/NoiseOverlay";
import MouseSpotlight from "@/components/anim/MouseSpotlight";
import ScrollProgress from "@/components/anim/ScrollProgress";
import SmoothScroll from "@/components/anim/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Club Platinum Resort — Water Park, Rides & Luxury Stays near Delhi NCR",
    template: "%s · Club Platinum Resort",
  },
  description:
    "A premium leisure resort near Delhi NCR blending a thrilling water park, unlimited amusement rides, an adventure park and modern rooms — perfect for families, friends and corporate groups.",
  keywords: [
    "Club Platinum Resort",
    "water park near Delhi",
    "resort Bahadurgarh",
    "corporate offsite Delhi NCR",
    "day outing near Delhi",
  ],
  openGraph: {
    title: "Club Platinum Resort",
    description:
      "Water park, amusement rides, adventure park and luxury stays near Delhi NCR.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SmoothScroll />
        <Preloader />
        <MouseSpotlight />
        <NoiseOverlay />
        <ScrollProgress />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <WhatsAppButton />
        <OfferPopup />
      </body>
    </html>
  );
}
