import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <main className="relative flex-1">
              <SidebarTrigger className="absolute top-2 right-2 z-10 h-6 w-6" />
              {children}
            </main>
            <AppSidebar />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
};

export default RootLayout;
