import React, {cloneElement, useState} from "react";
import {NavLink} from "react-router-dom";
import {FaHome} from "react-icons/fa";
import {FaRightToBracket, FaUser} from "react-icons/fa6";
import {IoMenu} from "react-icons/io5";
import {MdOutlineCurrencyExchange} from "react-icons/md";
import {SlLogout} from "react-icons/sl";
import {LuSettings} from "react-icons/lu";
import {cn} from "@/lib/utils";
import {useTheme} from "next-themes";
import LoginForm from "@/components/forms/login/LoginForm"; // adjust path if needed
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Switch} from "@/components/ui/switch";
import type {SVGProps} from "react";
import {useAuth} from "@/hooks/useAuth";
import {toast} from "sonner";

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {theme, setTheme} = useTheme();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const {user, setUser} = useAuth();

  return (
    <aside
      className={cn(
        "bg-[#433bff] w-full p-2 md:min-h-screen fixed bottom-0 md:sticky md:top-0 text-white transition-all duration-300 flex md:flex-col z-50",
        isExpanded ? "md:w-64" : "md:w-16",
      )}
    >
      <div className="md:h-full w-full">
        <nav
          className={cn(
            "md:h-[calc(100svh-20px)] md:sticky md:top-0 flex md:flex-col md:items-center md:justify-center md:space-y-4 flex-1",
            !isExpanded && "items-center",
          )}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn("mb-4 w-full p-2 rounded hover:bg-[#372fbf] hidden md:flex md:items-center")}
          >
            <IoMenu className="w-6 h-6 relative left-1" />
            <SidebarItemLabel show={isExpanded}>Menu</SidebarItemLabel>
          </button>

          <SidebarItem to="/" icon={<FaHome />} label="Accueil" isExpanded={isExpanded} />
          {user && (
            <SidebarItem to="/budget" icon={<MdOutlineCurrencyExchange />} label="Budget" isExpanded={isExpanded} />
          )}
          {user ? <SidebarItem to="/profile" icon={<FaUser />} label="Profile" isExpanded={isExpanded} /> : <></>}
          <Dialog>
            <DialogTrigger asChild>
              <button
                className={cn(
                  "mt-auto flex justify-center md:justify-start items-center p-2 rounded hover:bg-[#372fbf] cursor-pointer  w-full",
                )}
              >
                <LuSettings className="w-6 h-6 relative left-1" />
                <SidebarItemLabel show={isExpanded}>Configuration</SidebarItemLabel>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paramètres</DialogTitle>
                <DialogDescription>Personnalisez votre expérience utilisateur</DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-between py-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-50">Mode sombre</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Basculer entre le mode clair et sombre
                  </div>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked: boolean) => {
                    setTheme(checked ? "dark" : "light");
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
          {user ? (
            <>
              {/* Authenticated: Show Logout */}
              <button
                onClick={() => {
                  setUser(null);
                  toast.success("Vous avez été déconnecté");
                }}
                className={cn(
                  "flex justify-center md:justify-start md:items-center w-full p-2 rounded hover:bg-[#372fbf] cursor-pointer transition-all duration-300",
                )}
              >
                <SlLogout className="w-6 h-6 md:relative md:left-0" />
                <SidebarItemLabel show={isExpanded}>Se déconnecter</SidebarItemLabel>
              </button>
            </>
          ) : (
            <>
              {/* Not Authenticated: Show Connexion Dialog */}
              <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    className={cn(
                      "flex justify-center md:justify-start md:items-center w-full p-2 rounded hover:bg-[#372fbf] cursor-pointer transition-all duration-300",
                      !isExpanded ? "justify-center" : "items-center",
                    )}
                  >
                    <FaRightToBracket className="w-6 h-6 relative left-1" />
                    <SidebarItemLabel show={isExpanded}>Connexion</SidebarItemLabel>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connexion</DialogTitle>
                    <DialogDescription>Connecte-toi à ton compte ou inscris-toi</DialogDescription>
                  </DialogHeader>

                  <LoginForm
                    onSuccess={() => {
                      setLoginDialogOpen(false);
                      toast.success("Vous êtes maintenant connecté");
                    }}
                  />
                </DialogContent>
              </Dialog>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

const SidebarItemLabel = ({show, children}: {show: boolean; children: React.ReactNode}) => {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        show ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0",
      )}
    >
      <span className="whitespace-nowrap ml-3">{children}</span>
    </div>
  );
};

type SidebarItemProps = {
  to: string;
  icon: React.ReactElement<SVGProps<SVGSVGElement>>;
  label: string;
  isExpanded: boolean;
};

const SidebarItem = ({to, icon, label, isExpanded}: SidebarItemProps) => {
  const Icon = cloneElement(icon, {
    className: cn("w-6 h-6 md:relative md:left-1", icon.props.className),
  });

  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        cn(
          "flex justify-center md:justify-start md:items-center w-full p-2 rounded hover:bg-[#372fbf] cursor-pointer transition-all duration-300",
          isActive && "bg-[#372fbf]",
        )
      }
    >
      {Icon}
      <SidebarItemLabel show={isExpanded}>{label}</SidebarItemLabel>
    </NavLink>
  );
};

export default AppSidebar;
