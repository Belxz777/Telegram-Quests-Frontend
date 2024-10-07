"use server "

import { url } from "@/app/types";

async function createTeam(name: string): Promise<any> {
  console.log(name,url)
const res = await fetch(`${url}team`, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
name: name
})
});
if (!res.ok) {
console.log(res.status,url+"teamisnt")
return 
}
if (res.status !== 201) {
return 
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
    async function  addImage(name:string,image: File,location:string,result:string,answers:string[]): Promise<any> {
      console.log(image.size)
      const formData = new FormData();
      formData.append('file', image); 
      formData.append('location', location);
    formData.append('result', result);
      formData.append('answers',answers.join(','));
        const res = await fetch(`${url}team/uploadPhotoUrls/${name}`, {
        method: 'POST',
        body: formData
        });
        if (res.status !== 201) {
        return 
        }

        const response= await res.json();
        
        return response
      }
export  { createTeam,addImage }