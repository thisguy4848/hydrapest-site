import type { Metadata } from "next";
import { PortalProvider } from "@/lib/portal-context";

export const metadata: Metadata = {
  title: "Hydra Portal",
  robots: { index: false, follow: false },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalProvider>
      {children}
    </PortalProvider>
  );
}
