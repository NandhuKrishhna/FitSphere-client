import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar /> {/* Sidebar component */}
      <main className="flex-1 p-4">
        <SidebarTrigger /> {/* Trigger to open/close the sidebar */}
        {children} {/* Main content */}
      </main>
    </SidebarProvider>
  );
}