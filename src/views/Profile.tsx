import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {toast, Toaster} from "sonner";

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
      <button onClick={() => console.log(profile)}>test</button>
      <div className="mx-auto max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-7">
            <CardTitle className="text-2xl font-bold">Détail du profil</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 sm:flex-none px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 sm:flex-none px-4 py-2 text-white rounded-lg bg-[#433BFF] hover:bg-[#3530CC] transition-colors"
                  >
                    Sauvegarder
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-4 py-2 text-white rounded-lg bg-[#433BFF] hover:bg-[#3530CC] transition-colors"
                >
                  Mettre à jour
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Card className="bg-slate-50 border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Renseignements personnels</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Nom</label>
                    <input
                      type="text"
                      value={profile?.lastName || ""}
                      onChange={handleChange("lastName")}
                      disabled={!isEditing}
                      className="w-full p-2.5 border rounded-lg bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#433BFF] focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Prénom</label>
                    <input
                      type="text"
                      value={profile?.firstName || ""}
                      onChange={handleChange("firstName")}
                      disabled={!isEditing}
                      className="w-full p-2.5 border rounded-lg bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#433BFF] focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Mot de passe</label>
                    <input
                      type="text"
                      value={profile?.password || ""}
                      onChange={handleChange("password")}
                      disabled={!isEditing}
                      className="w-full p-2.5 border rounded-lg bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#433BFF] focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Courriel</label>
                    <input
                      type="email"
                      value={profile?.email || ""}
                      onChange={handleChange("email")}
                      disabled={!isEditing}
                      className="w-full p-2.5 border rounded-lg bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#433BFF] focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-sm font-medium text-gray-700 block">Téléphone</label>
                    <input
                      type="tel"
                      value={profile?.phone || ""}
                      onChange={handleChange("phone")}
                      disabled={!isEditing}
                      className="w-full p-2.5 border rounded-lg bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#433BFF] focus:border-transparent transition-colors"
                    />
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
