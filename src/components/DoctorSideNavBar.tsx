import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-[#1a1a1a] shadow-lg shadow-purple-500/20">
        {/* Sidebar Header */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://res.cloudinary.com/dzsdfw5vx/image/upload/v1737205934/Screenshot_2025-01-18_183947-removebg-preview_vsh4xs.png"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white"
            aria-label="Toggle Sidebar"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        {/* Sidebar Footer (User Info) */}
        <div className="border-t border-gray-700 flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
            <div className="leading-4">
              <h4 className="font-semibold text-white">John Doe</h4>
              <span className="text-xs text-gray-400">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} className="text-white" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export function SidebarItem({ icon, text, active = false, alert = false }: SidebarItemProps) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }
  const { expanded } = context;

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
        transition-colors group
        ${active ? "bg-black/40 hover:bg-black/60 text-white" : "hover:bg-white/10 text-gray-400"}
      `}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
        {text}
      </span>
      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-purple-400 ${expanded ? "" : "top-2"}`} />}
      
      {!expanded && (
        <div
          className="
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-purple-600 text-white text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          "
        >
          {text}
        </div>
      )}
    </li>
  );
}
