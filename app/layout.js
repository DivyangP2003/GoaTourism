import Footer from "./_components/Footer"
import Navbar from "./_components/Navbar"
import "./globals.css"

export const metadata = {
  title: "YUGAANTAR",
  description:
    "Explore the rich heritage, culture, and traditions of Konkan Goa through temples, festivals, monuments, and archaeological sites.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
