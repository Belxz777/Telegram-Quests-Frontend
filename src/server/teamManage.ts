"use server "
const url =  "https://kdnhfs81-8000.euw.devtunnels.ms/"
async function createTeam(name: string): Promise<any> {
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
console.log(res.status)
throw new Error('Failed to fetch data')
}
if (res.status !== 201) {
return "Error "
}
const response= await res.json();

return response
}
export  default createTeam 