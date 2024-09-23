import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAssetTracking = defineStore("assetTracking", () => {
    const tickerData = ref(null);
    
    const fetchAsset = async () => {
        try {
        const response = await axios.get(
            "https://dsde1736.fornex.org/api/notify/get_asset",
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        tickerData.value = response.data;
        } catch (error) {
        console.log("Error fetching data: " + error);
        }
    };
    const deleteSelectedAsset = async (id) => {
        try {
            const response = await axios.delete(
           `https://dsde1736.fornex.org/api/notify/delete_ticker_tracking?tt_id=${id}`,
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
        tickerData,
        fetchAsset,
        deleteSelectedAsset
    };
});
