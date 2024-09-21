import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useImpulse = defineStore("impulses", () => {
  const selectedImpulse = ref(null);
  
  const fetchImpulse = async () => {
    try {
      const response = await axios.get(
        "https://dsde1736.fornex.org/api/notify/get_impulse",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      selectedImpulse.value = response.data;
    } catch (error) {
      console.log("Error fetching data: " + error);
    }
  };
  const deleteSelectedImpulse = async (id) => {
    try {
        const response = await axios.delete(
          `https://dsde1736.fornex.org/api/notify/delete_impulse?impulse_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data: " + error);
      }
  };

  return {
    selectedImpulse,
    fetchImpulse,
    deleteSelectedImpulse
  };
});
