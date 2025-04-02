import {User} from "@/types/user/user";
import {FormCard} from "@/components/forms/FormCard";
import {LuUser, LuPhone, LuCalendar, LuSettings} from "react-icons/lu";
import {useTheme} from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Switch} from "@/components/ui/switch";

interface ProfileCardProps {
  profile: User | null;
}

export const ProfileCard = ({profile}: ProfileCardProps) => {
  const {theme, setTheme} = useTheme();

  return (
    <FormCard noPadding>
      <div className="relative h-32 bg-gradient-to-r from-[#433BFF] to-[#7A75FF]">
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute right-4 top-4 p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200">
              <LuSettings className="w-5 h-5" />
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
                <div className="text-sm text-slate-500 dark:text-slate-400">Basculer entre le mode clair et sombre</div>
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
        <div className="absolute -bottom-12 left-6">
          <div className="relative group">
            <div className="h-24 w-24 rounded-2xl bg-white dark:bg-slate-700 p-1">
              <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#433BFF] to-[#7A75FF] flex items-center justify-center relative">
                <LuUser className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 px-6 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {profile?.firstName} {profile?.lastName}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{profile?.email}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <div className="w-10 h-10 rounded-lg bg-[#433BFF]/10 flex items-center justify-center">
              <LuPhone className="w-5 h-5 text-[#433BFF]" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Téléphone</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {profile?.phone === "true" ? "" : profile?.phone || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <div className="w-10 h-10 rounded-lg bg-[#433BFF]/10 flex items-center justify-center">
              <LuCalendar className="w-5 h-5 text-[#433BFF]" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Date de naissance</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {profile?.birthDate ? new Date(profile.birthDate).toLocaleDateString() : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormCard>
  );
};
