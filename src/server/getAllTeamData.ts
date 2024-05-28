"use server "
const url =  "https://kdnhfs81-8000.euw.devtunnels.ms/"
async function getAllTeams(): Promise<Teams[] | Teams | null>  {
    const res = await fetch(`${url}team/`);
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const response = await res.json();
    return response
}
export { getAllTeams };