async function getIp(): Promise<any>  {

    const res = await fetch(`https://api.ipify.org?format=json`);
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    return receiveddata
}

export {getIp}