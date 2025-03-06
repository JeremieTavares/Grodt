import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {toast, Toaster} from "sonner";
import {LuUser, LuMail, LuPhone, LuLock, LuSave, LuX, LuPencil, LuCircleUser} from "react-icons/lu";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [, setError] = useState<string | null>(null);
  const {userId} = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP erreur status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Données reçues:", data);
        setProfile(data);
      } catch (err) {
        console.error("Erreur:", err);
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleChange = (field: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({
        ...profile,
        [field]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    if (profile && userId) {
      try {
        const response = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la sauvegarde");
        }

        const data = await response.json();
        setProfile(data);
        setIsEditing(false);
        toast.success("Profil mis à jour avec succès!", {
          style: {
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
          },
        });
      } catch (error) {
        console.error("Erreur:", error);
        toast.error("Erreur lors de la sauvegarde", {
          style: {
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {background: "white"},
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            success: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#433BFF]",
            error: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-500",
          },
        }}
      />
      <div className="mx-auto max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-7 border-b">
            <div className="flex items-center gap-3">
              <LuCircleUser className="w-8 h-8 text-[#433BFF]" />
              <CardTitle className="text-2xl font-bold text-slate-800 tracking-tight">Détail du profil</CardTitle>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 sm:flex-none px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <LuX className="w-4 h-4" />
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 sm:flex-none px-4 py-2 text-white rounded-lg bg-[#433BFF] hover:bg-[#3530CC] transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <LuSave className="w-4 h-4" />
                    Sauvegarder
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-4 py-2 text-white rounded-lg bg-[#433BFF] hover:bg-[#3530CC] transition-colors font-medium inline-flex items-center gap-2"
                >
                  <LuPencil className="w-4 h-4" />
                  Mettre à jour
                </button>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Card className="border-none shadow-[0_2px_8px_0px_rgba(67,59,255,0.08)] hover:shadow-[0_4px_12px_0px_rgba(67,59,255,0.12)] transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-18 w-18 rounded-full bg-[#433BFF] flex items-center justify-center shadow-[0_2px_8px_0px_rgba(67,59,255,0.25)]">
                    <LuUser className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {profile?.firstName} {profile?.lastName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <LuMail className="h-4 w-4" />
                      <span>{profile?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                      <LuPhone className="h-4 w-4" />
                      <span>{profile?.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>

          <CardContent className="pt-6">
            <Card className="bg-white border border-slate-200">
              <CardHeader className="border-b">
                <CardTitle className="text-xl font-semibold text-black tracking-tight">
                  Renseignements personnels
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block tracking-tight">Nom</label>
                    <div className="relative">
                      <LuUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                      <Input
                        type="text"
                        value={profile?.lastName || ""}
                        onChange={handleChange("lastName")}
                        disabled={!isEditing}
                        className="w-full bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block tracking-tight">Prénom</label>
                    <div className="relative">
                      <LuUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                      <Input
                        type="text"
                        value={profile?.firstName || ""}
                        onChange={handleChange("firstName")}
                        disabled={!isEditing}
                        className="w-full bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block tracking-tight">Mot de passe</label>
                    <div className="relative">
                      <LuLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                      <Input
                        type="password"
                        value={profile?.password || ""}
                        onChange={handleChange("password")}
                        disabled={!isEditing}
                        className="w-full bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block tracking-tight">Courriel</label>
                    <div className="relative">
                      <LuMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                      <Input
                        type="email"
                        value={profile?.email || ""}
                        onChange={handleChange("email")}
                        disabled={!isEditing}
                        className="w-full bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-sm font-medium text-slate-700 block tracking-tight">Téléphone</label>
                    <div className="relative">
                      <LuPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                      <Input
                        type="tel"
                        value={profile?.phone || ""}
                        onChange={handleChange("phone")}
                        disabled={!isEditing}
                        className="w-full bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
