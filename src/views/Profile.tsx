import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {toast, Toaster} from "sonner";
import {LuUser, LuMail, LuPhone, LuLock, LuSave, LuX, LuPencil, LuCircleUser, LuCalendar} from "react-icons/lu";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
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
        console.log("Données reçues du serveur:", data);
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
        // Format the data before sending
        const formattedProfile = {
          id: profile.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          password: profile.password,
          birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString() : null,
          isActive: true,
        };

        console.log("Données envoyées au serveur:", JSON.stringify(formattedProfile, null, 2));

        const response = await fetch(`https://money-pie-2.fly.dev/api/v1/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formattedProfile),
        });

        const responseText = await response.text();
        console.log("Réponse brute du serveur:", responseText);

        if (!response.ok) {
          let errorData;
          try {
            errorData = JSON.parse(responseText);
          } catch (e) {
            errorData = {message: responseText};
          }
          console.error("Erreur détaillée:", errorData);
          throw new Error(errorData?.message || "Erreur lors de la sauvegarde");
        }

        const data = JSON.parse(responseText);
        console.log("Données reçues après sauvegarde:", data);
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
        console.error("Erreur complète:", error);
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
            <Card className="border-none overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-[0_2px_8px_0px_rgba(67,59,255,0.08)] hover:shadow-[0_4px_12px_0px_rgba(67,59,255,0.12)] transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#433BFF] to-[#7A75FF] rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#433BFF] to-[#7A75FF] flex items-center justify-center relative shadow-[0_2px_8px_0px_rgba(67,59,255,0.25)] group-hover:shadow-[0_4px_12px_0px_rgba(67,59,255,0.35)] transition-all duration-300">
                      <LuUser className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {profile?.firstName} {profile?.lastName}
                      </h3>
                      <div className="h-px w-24 bg-gradient-to-r from-[#433BFF] to-transparent"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-slate-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-100 shadow-sm hover:shadow transition-shadow duration-200">
                        <LuMail className="h-4 w-4 text-[#433BFF]" />
                        <span className="font-medium">{profile?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-100 shadow-sm hover:shadow transition-shadow duration-200">
                        <LuPhone className="h-4 w-4 text-[#433BFF]" />
                        <span className="font-medium">{profile?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>

          <CardContent className="pt-6">
            <Card className="border-none overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-[0_2px_8px_0px_rgba(67,59,255,0.08)] hover:shadow-[0_4px_12px_0px_rgba(67,59,255,0.12)] transition-all duration-300">
              <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
                    Renseignements personnels
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Nom</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuUser className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="text"
                        value={profile?.lastName || ""}
                        onChange={handleChange("lastName")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Prénom</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuUser className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="text"
                        value={profile?.firstName || ""}
                        onChange={handleChange("firstName")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Mot de passe</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuLock className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="password"
                        value={profile?.password || ""}
                        onChange={handleChange("password")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Courriel</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuMail className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="email"
                        value={profile?.email || ""}
                        onChange={handleChange("email")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Date de naissance</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuCalendar className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="date"
                        value={profile?.birthDate ? profile.birthDate.split("T")[0] : ""}
                        onChange={handleChange("birthDate")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 lg:col-span-2 group">
                    <label className="text-sm font-semibold text-slate-700 block tracking-tight flex items-center gap-2">
                      <span>Téléphone</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                    </label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#433BFF]/5 to-transparent rounded-l-lg flex items-center justify-center">
                        <LuPhone className="w-4 h-4 text-[#433BFF]" />
                      </div>
                      <Input
                        type="tel"
                        value={profile?.phone || ""}
                        onChange={handleChange("phone")}
                        disabled={!isEditing}
                        className="w-full bg-white border-slate-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium pl-10 rounded-lg focus:ring-[#433BFF] focus:border-[#433BFF] transition-shadow group-hover:shadow-md"
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
