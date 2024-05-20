"use server "
const host =  "https://kdnhfs81-8000.euw.devtunnels.ms/"
async function createTeam(name: string): Promise<any> {
const res = await fetch(`${host}team`, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
name: name
})
});
if (!res.ok) {
console.log(res.status)
throw new Error('Failed to fetch data')
}
if (res.status !== 201) {
return "Error "
}
const response= await res.json();

return response
}
async function addImage(id:number,url: string,location:string): Promise<any> {
    const res = await fetch(`${host}team/uploadPhotoUrls/${id}`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
  url: url,
  location:location
    })
    });
    if (!res.ok) {
    console.log(res.status)
    throw new Error('Failed to fetch data')
    }
    if (res.status !== 201) {
    return "Error "
    }
    const response= await res.json();
    
    return response
    }
export  { createTeam,addImage }