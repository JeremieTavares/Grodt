import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { cn } from "@/lib/utils";

const AppSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className={cn(
      "h-screen text-white transition-all duration-300 flex flex-col",
      isExpanded ? "w-64 p-4" : "w-16 p-2","bg-[#433bff]"
    )}>

      <button onClick={() => setIsExpanded(!isExpanded)}
        className={cn("mb-4 p-2 rounded hover:bg-[#372fbf] transition-all duration-300",
          "flex items-center gap-2", !isExpanded && "justify-center w-full"
        )}>
        <IoMenu className="w-6 h-6" />
        {isExpanded && <span className="text-lg">Menu</span>}
      </button>

      <nav className={cn("flex flex-col space-y-4 flex-1", !isExpanded && "items-center")}>
        <SidebarItem to="/" icon={<FaHome className="w-6 h-6" />} label="Accueil" isExpanded={isExpanded} />
        <SidebarItem to="/budget" icon={<MdOutlineCurrencyExchange className="w-6 h-6" />} label="Budget" isExpanded={isExpanded} />
        <SidebarItem to="/profile/:userId" icon={<FaUser className="w-6 h-6" />} label="Profile" isExpanded={isExpanded} />
      </nav>

      <div className="mt-auto">
        <SidebarItem to="/logout" icon={<SlLogout className="w-6 h-6" />} label="Se déconnecter" isExpanded={isExpanded} />
      </div>
    </aside>
  );
};

const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string; isExpanded: boolean }> = ({
  to,
  icon,
  label,
  isExpanded,
}) => {
  return (
    <NavLink
      to={to} className={({ isActive }) =>
        cn("flex gap-2 p-2 rounded hover:bg-[#372fbf] cursor-pointer transition-all duration-300",
          isActive && "bg-[#372fbf]",!isExpanded ? "justify-center w-full" : "items-center"
        )}>
      {icon}
      {isExpanded && <span>{label}</span>}
    </NavLink>
  );
};

export default AppSidebar;
