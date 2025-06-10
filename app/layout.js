import { Inter,
  Plus_Jakarta_Sans,
  Poly,
  Archivo_Black,
  Poppins,
  Sora,
  Annie_Use_Your_Telescope,
} from "next/font/google";

import "./globals.css";

const annie = Annie_Use_Your_Telescope({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-annie',
});



const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weights: ["600", "700"],
  variable: "--font-plus-jakarta-sans",
});

const poly = Poly({
  subsets: ["latin"],
  style: ["italic"],
  weight: "400",
  variable: "--font-poly",
});

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <body
        className={`${sora.variable} ${inter.className} ${plusJakartaSans.variable} ${archivo.variable} ${poly.variable} ${poppins.variable} ${annie.variable}  font-sans`}
      
      >
        {children}
      </body>
    </html>
  );
}
