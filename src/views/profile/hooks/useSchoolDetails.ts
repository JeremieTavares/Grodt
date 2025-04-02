import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useApi} from "@/hooks/useApi";
import {SchoolDetails} from "@/types/user/school-details";

export const useSchoolDetails = (userId: number) => {
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails | null>(null);
  const {school} = useApi(userId);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        const response = await school?.getAll();
        if (response?.data) {
          const schoolData = Array.isArray(response.data) ? response.data[0] : response.data;

          // Remove the user property from the school data because it's not soppused to be in the response
          // Its causing errors on the backend when updating the school details if it's not removed
          delete schoolData.user;
          setSchoolDetails(schoolData as unknown as SchoolDetails);
        }
      } catch (error: any) {
        // Set school details to null in case of any error
        setSchoolDetails(null);
      }
    };

    if (userId) {
      fetchSchoolDetails();
    }
  }, [userId, school]);

  const deleteSchoolDetails = async () => {
    try {
      await school?.delete();
      setSchoolDetails(null);
      toast.success("Les informations scolaires ont été supprimées avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression des informations scolaires");
    }
  };
  return {
    schoolDetails,
    setSchoolDetails,
    deleteSchoolDetails,
  };
};
