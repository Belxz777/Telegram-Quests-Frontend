"use client"

import { useCallback, useEffect, useState } from "react"
import { QrReader } from "react-qr-reader"
import { useRouter } from "next/navigation"
import { useBackButton } from "@tma.js/sdk-react"
import Reroute from "@/components/Reroute"
import { locationCoords } from "@/server/special/location"

export default function Scanner() {
  type ScanStatus = "idle" | "success" | "error" | "loading"
  const [scanStatus, setScanStatus] = useState<ScanStatus >("idle")
const [reroute, setreroute]  = useState(false)
 
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  // Reset processing state when component unmounts
  useEffect(() => {
    return () => {
      setIsProcessing(false)
    }
  }, [])

  // Handle back button for Telegram Mini App
  const backButton = useBackButton()
  useEffect(() => {
    backButton.show()
    const handler = () => router.push("/")
    backButton.on("click", handler)

    return () => {
      backButton.off("click", handler)
    }
  }, [backButton, router])

  // Process QR code result
  const handleScan = useCallback(
    (result: { text: string } | null | undefined, error: Error | null) => {
      // Skip if already processing a result
      if (isProcessing) return

      if (result?.text) {
        setIsProcessing(true)

        setScanStatus("loading")
        try {
          // Parse coordinates from QR code text
          const rawCoords = result.text.trim().split(",")

          if (rawCoords.length !== 2) {
            throw new Error("Invalid coordinate format")
          }

          const lat = Number.parseFloat(rawCoords[0])
          const lon = Number.parseFloat(rawCoords[1])

          if (isNaN(lat) || isNaN(lon)) {
            throw new Error("Invalid coordinates")
          }

          // Set coordinates and update status
          setCoordinates([lat, lon])
          setScanStatus("success")
        } catch (err) {
          console.error("QR code parsing error:", err)
          setScanStatus("error")
        }

        // Reset processing state after a delay
        setTimeout(() => {
          setIsProcessing(false)
        }, 2000)
      } else if (error) {
        console.error("QR scanner error:", error)
      }
    },
    [isProcessing],
  )

  // Navigate to location page
  const navigateToLocation = async () => {
    if (!coordinates) return
    setreroute(true)

    try {
      setScanStatus("loading")
      const [lat, lon] = coordinates
      const location = await locationCoords(lat, lon)
if("status" in location){
setScanStatus("error")

}
else{
  setScanStatus("success")
  router.push(`/location/${location.id}`)

}
    } catch (error) {
      console.error("Navigation error:", error)
      setScanStatus("error")
    }
  }
  if(reroute){
    return <Reroute text="Переход на страницу локации" />
  }

  return (
    <div className="bg-scin-base min-h-screen w-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-md mx-auto mt-5 rounded-xl border-4 border-base overflow-hidden">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={
            (result, error) => handleScan(result?.getText() ? { text: result.getText() } : null, error || null)          }
          scanDelay={300}
          containerStyle={{ width: "100%" }}
          className="rounded-xl"
        />

        {scanStatus === "success" && coordinates && (
          <div className="p-4 flex flex-col items-center justify-center">
            <h2 className="text-link-base text-2xl text-center">Код отсканирован</h2>
            <h3 className="text-link-base text-2xl text-center">
              {coordinates[0]}|{coordinates[1]}
            </h3>
            <button
              className="bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex items-center justify-center mt-4"
              onClick={navigateToLocation}
            >
               Перейти
            </button>
          </div>
        )}
        {scanStatus === "error" && <h2 className="text-red-500 text-center p-4">Ошибка сканирования</h2>}
      </div>

      <h1 className="text-center font-extrabold text-link-base text-xl mt-6">
        Включено автоопределение кода, просто наведите камеру
      </h1>
    </div>
  )
}