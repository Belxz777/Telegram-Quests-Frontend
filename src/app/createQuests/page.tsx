"use client"

import { createNewQuest } from "@/server/getAllQuests"
import { useBackButton } from "@tma.js/sdk-react"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState } from "react"

interface QuestFormData {
  question: string
  answer: string
  variants: string[]
  lat: string
  lon: string
  quizIn: string
  quizId: number
  image: string
  rebus: boolean
  todo: boolean
}

export default function QuestForm() {
  const [formData, setFormData] = useState<QuestFormData>({
    question: "",
    answer: "",
    variants: [""],
    lat: "",
    lon: "",
    quizIn: "",
    quizId: 1,
    image: "",
    rebus: false,
    todo: false,
  })

  const [activeTab, setActiveTab] = useState<"form" | "preview">("form")
const backButton = useBackButton()
const  router = useRouter()
backButton.show()
backButton.on('click', () =>{
  router.push("/adminPanel")
})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quizId" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleOptionChange = (index: number, value: string) => {
    const newvariants = [...formData.variants]
    newvariants[index] = value
    setFormData((prev) => ({
      ...prev,
      variants: newvariants,
    }))
  }

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, ""],
    }))
  }

  const removeOption = (index: number) => {
    if (formData.variants.length <= 1) return

    const newvariants = [...formData.variants]
    newvariants.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      variants: newvariants,
    }))
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(JSON.stringify(formData, null, 2))
      .then(() => alert("Quest data copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            lat: position.coords.latitude.toFixed(6),
            lon: position.coords.longitude.toFixed(6),
          }))
        },
        (error) => {
          console.error("Error getting location: ", error)
          alert("Could not get your location. Please enter coordinates manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    alert("Form submitted with data:\n" + JSON.stringify(formData, null, 2))
  }

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="mb-4">
        <div className="flex border rounded-md overflow-hidden">
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${activeTab === "form" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab("form")}
          >
            Form
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${activeTab === "preview" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </div>
      </div>

      {activeTab === "form" ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <header className="mb-6">
            <h1 className="text-xl font-bold">Create Quest</h1>
          </header>

          <fieldset className="space-y-4">
            <legend className="sr-only">Quest Information</legend>

            <div className="space-y-2">
              <label htmlFor="question" className="block text-sm font-medium">
                Question
              </label>
              <textarea
                id="question"
                name="question"
                placeholder="Enter the question text"
                value={formData.question}
                onChange={handleChange}
                className="w-full min-h-[80px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="answer" className="block text-sm font-medium">
                Correct Answer
              </label>
              <input
                id="answer"
                name="answer"
                placeholder="Correct answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Answer variants</label>
                <button
                  type="button"
                  onClick={addOption}
                  className="text-sm bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                >
                  + Add Option
                </button>
              </div>

              {formData.variants.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                    title="Remove option"
                    disabled={formData.variants.length <= 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
              <p className="text-xs text-gray-500">
                Add multiple variants for multiple-choice questions. The correct answer should match one of these
                variants.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="lat" className="block text-sm font-medium">
                  Latitude
                </label>
                <input
                  id="lat"
                  name="lat"
                  placeholder="56.849320"
                  value={formData.lat}
                  onChange={handleChange}
                  type="text"
                  inputMode="decimal"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lon" className="block text-sm font-medium">
                  Longitude
                </label>
                <input
                  id="lon"
                  name="lon"
                  placeholder="53.244961"
                  value={formData.lon}
                  onChange={handleChange}
                  type="text"
                  inputMode="decimal"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              onClick={getCurrentLocation}
            >
              Get Current Location
            </button>

            <div className="space-y-2">
              <label htmlFor="quizIn" className="block text-sm font-medium">
                Location Name
              </label>
              <input
                id="quizIn"
                name="quizIn"
                placeholder="e.g. Санаторий Ижмаш"
                value={formData.quizIn}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="quizId" className="block text-sm font-medium">
                Quiz ID
              </label>
              <input
                id="quizId"
                name="quizId"
                type="number"
                min="1"
                value={formData.quizId}
                onChange={handleNumberChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block text-sm font-medium">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="rebus" className="text-sm font-medium cursor-pointer">
                Rebus
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="rebus"
                  name="rebus"
                  type="checkbox"
                  checked={formData.rebus}
                  onChange={handleCheckboxChange}
                />
       
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="todo" className="text-sm font-medium cursor-pointer">
                Todo
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="todo"
                  name="todo"
                  type="checkbox"
                  checked={formData.todo}
                  onChange={handleCheckboxChange}
                />
            
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
            >
              Отправить
            </button>
          </fieldset>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Quest Preview</h2>
            <button
              type="button"
              onClick={copyToClipboard}
              className="p-2 text-gray-600 hover:text-gray-900"
              title="Copy to clipboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </header>

          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">{JSON.stringify(formData, null, 2)}</pre>

          <footer className="mt-4">
            <button
              type="button"
              onClick={copyToClipboard}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
            >
              Copy Quest Data
            </button>
          </footer>
        </div>
      )}
    </div>
  )
}

