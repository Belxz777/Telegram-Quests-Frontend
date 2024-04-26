async function getAllQuests(): Promise<QuizData>  {
if(!process.env.BACKEND_URL){
throw new Error("")
}
    const res = await fetch(`https://kdnhfs81-8000.euw.devtunnels.ms/Quests/`);
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    console.log(receiveddata)
    return receiveddata
}
async function getAllQuestsByLatLon(lat:any,lon:any): Promise<QuizData>  {

        const res = await fetch(`https://kdnhfs81-8000.euw.devtunnels.ms/Quests/${lat}/${lon}/`);
        if (!res.ok) {
            console.log(res.status)
            throw new Error('Failed to fetch data')
        }
        const receiveddata = await res.json();
        console.log(receiveddata)
        return receiveddata
    }
export {getAllQuests,getAllQuestsByLatLon}