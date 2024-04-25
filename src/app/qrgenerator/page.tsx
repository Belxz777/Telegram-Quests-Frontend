'use client'
import React, { useState } from "react";
import QRCode from "react-qr-code";

export default function Generator() {
  const [qrCodeValue, setQrCodeValue] = useState("");

  return (
    <div className=' bg-white'>
          <div className=' flex flex-col   justify-center items-center '>

      {qrCodeValue != "" && (
        <QRCode value={qrCodeValue} className='pt-6  w-2/4 h-1/3 '  width={500} height={400}/>
      )}
      <input
        className=' text-black pt-3.5 '
        onChange={(e) => {
          setQrCodeValue(e.target.value);
        }}
      />
      
</div>
    </div>
  );
}
