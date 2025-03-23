"use server"

import { url } from "@/app/types";

async function createTeam(name: string): Promise<any> {
const res = await fetch(`${url}teams/`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
name: name
})
});
if (!res.ok) {
throw new Error('Failed to create')
}

const response= await res.json();

return response
}
// async function  addImage(name:string,location:string,result:string): Promise<any> {
//   console.log(result)
//     const res = await fetch(`${host}team/uploadQuestResult/${name}`, {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//   location:location,
//   result:result
//     })
//     });
//     if (!res.ok) {
//     console.log(res.status)
//     throw new Error('Failed to fetch data')
//     }
//     if (res.status !== 201) {
//     return "Error "
//     }
//     const response= await res.json();
    
//     return response
//     }
async function addImage(name: string, formData: FormData): Promise<any> {
  const res = await fetch(`${url}teams/uploadPhotoUrls/${name}`, {
    method: 'POST',
    body: formData, // Передаем FormData напрямую
  });

  if (res.status !== 201) {
    return null;
  }

  const response = await res.json();
  return response;
}
export  { createTeam,addImage }