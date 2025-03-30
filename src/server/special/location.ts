"use server"
import { error, url } from "@/app/types";
import { LocationData } from "@/app/types/Main";

    async function locationCoords(lat: number, lon: number): Promise<LocationData | error> {
        try {
          const res = await fetch(`${url}location/coords/${lat}/${lon}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            cache: 'no-store'
          });
          
          if (!res.ok) {
return {
    message: "Ошибка при получении локации по координатам.",
    status: res.status
}
        }
        //   const text = await res.text();
        //   if (!text) {
        //     throw new Error('Empty response received');
        //   }
        //   console.log(res.status)
        const response = await res.json();
        return response;
        } catch (error) {
          console.error('Error fetching location:', error);
          throw error;
        }
      }
      


      export { locationCoords };