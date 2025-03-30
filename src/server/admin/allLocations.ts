"use server"
import { error, url } from "@/app/types";
import { LocationData } from "@/app/types/Main";

async function locationsAll(): Promise<LocationData | LocationData[] |error>  {
    const res = await fetch(`${url}location/`);
    if (!res.ok) {
        return {
            status: res.status,
            message: 'err'
        }
    }
    const response = await res.json();
    return response
}
export { locationsAll }