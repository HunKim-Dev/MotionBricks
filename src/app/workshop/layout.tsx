import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";
import BottomBrickDock from "@/components/ui/bottom-bricks-dock";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarInset>
          <main className="relative flex-1">
            <SidebarTrigger className="absolute top-2 right-2 z-10 h-6 w-6" />
            {children}
            <BottomBrickDock />
          </main>
        </SidebarInset>
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
