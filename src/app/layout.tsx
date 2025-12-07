import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-left" richColors />
      </body>
    </html>
  );
};

export default RootLayout;
