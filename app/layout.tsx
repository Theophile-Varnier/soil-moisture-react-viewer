import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  MantineProvider,
} from "@mantine/core";
import Header from "./components/Header";
import StoreProvider from "./storeProvider";
import AppTabs from "./components/AppTabs";
import { Filters } from "./components/Filters";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Soil Moisture Viewer",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <MantineProvider defaultColorScheme="dark">
            <AppShell header={{ height: 60 }}>
              <AppShellHeader>
                <Header></Header>
              </AppShellHeader>
              <AppShellMain>
                <AppTabs></AppTabs>
                {children}
                <Filters></Filters>
              </AppShellMain>
            </AppShell>
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
