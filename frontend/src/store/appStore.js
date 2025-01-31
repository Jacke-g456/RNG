import {defineStore} from 'pinia'
import {ref} from 'vue'




export const useAppStore = defineStore('app', () => {
    // ACTIONS
    const getFrequencies = async () => { 
        const controller = new AbortController(); 
        const signal = controller.signal; 
        setTimeout(() => controller.abort(), 60000);    
        const URL = `/api/numberfrequency`;         
        try { 
            const response = await fetch(URL, { method: 'GET', signal });                 
            if (response.ok) { 
                const data = await response.json(); 
                if (data.status === "found") { 
                    console.log(data.data);
                    return data.data;                                                    
                } 
            } 
        } catch (err) {      
            console.error('getFrequencies error:', err.message);           
        }     
        return [];
    };

    const getOnCount = async (LED_Name) => { 
        const URL = '/api/oncount'; 
        const controller = new AbortController(); 
        const signal = controller.signal; 
        setTimeout(() => controller.abort(), 60000); 

        const form = new FormData();  
        form.append("LED_Name", LED_Name);  
        try {
            const response = await fetch(URL, { method: 'POST', body: form, signal }); 
            if (response.ok) {
                const data = await response.json(); 
                if (data.status === "found") {                
                    console.log(data.data);  
                    return data.data;                 
                }                      
            }
        } catch (err) {
            console.error('getOnCount error:', err.message); 
        }
        return 0;
    };

    return { getFrequencies, getOnCount }; // ✅ Make sure these are returned
}, { persist: true });
