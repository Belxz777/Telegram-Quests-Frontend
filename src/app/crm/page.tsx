"use client"

import { useState } from "react"
import { Quiz } from "../types/Main"
import { createNewQuest } from "@/server/getAllQuests"
export default function Component() {
  const [quest, setQuest] = useState<Quiz>({
    question: "",
    answer: "",
    variants: [] ,
    lat: "",
    lon: "",
    quizIn: "",
    quizId: 0,
    image:  "",
    rebus: false,
    todo: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuest((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggle = (name: string) => {
    setQuest((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
const newQuest =  await createNewQuest(quest)
if(newQuest){
    alert("Задание успешно создано!")
    alert(`newQuest,${quest}`)
}else{
    alert("Ошибка при создании задания")
    alert(newQuest)
}
    console.log(quest) // Here you would typically send the data to your backend
  }

  return (
    <div className="w-full max-w-md mx-auto  bg-scin-base shadow-md rounded-lg overflow-hidden">
      <div className="bg-scin-base p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold  text-link-base">Создать задание</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4 " >
          <div className="space-y-2">
          <h1 className=" text-link-base">Вопрос || Задание</h1>
            <textarea
              id="question"
              name="question"
              value={quest.question}
              onChange={handleChange}
              className="w-full bg-hint-base rounded-md  px-4 py-2"
              required
            />
          </div>
          <div className="space-y-2">
          <h1 className=" text-link-base">Варианты</h1>
            <input
              id="variants"
              name="variants"
              value={quest.variants}
                          onChange={(e) => {
                            const values = e.target.value.split(',').map(item => item.trim())
                            setQuest(prev => ({ ...prev, variants: values }))
                          }}
              className=" ml-5 bg-hint-base rounded-md  text-hint-base px-4 py-2"
      
            />
          </div>
          <div className="space-y-2">
          <h1 className=" text-link-base">Ответ</h1>
            <input
              id="answer"
              name="answer"
              value={quest.answer}
              onChange={handleChange}
              className=" ml-5 bg-hint-base rounded-md  text-hint-base px-4 py-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
            <h1 className=" text-link-base">Широта</h1>
              <input
                id="lat"
                name="lat"
                type="number"
                step="any"
                value={quest.lat}
                onChange={handleChange}
              className=" ml-2 w-3/4 bg-hint-base rounded-md  text-hint-base px-4 py-2"
                required
              />
            </div>
            <div className="space-y-2">
            <h1 className=" text-link-base">Долгота</h1>
              <input
                id="lon"
                name="lon"
                type="number"
                step="any"
                value={quest.lon}
                onChange={handleChange}
              className=" ml-2 w-3/4 bg-hint-base rounded-md  text-hint-base px-4 py-2"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
          <h1 className=" text-link-base">Название локации</h1>
            <input
              id="quizIn"
              name="quizIn"
              value={quest.quizIn}
              onChange={handleChange}
              className="ml-5 bg-hint-base rounded-md px-4 py-2"
              required
            />
          </div>
          <div className="space-y-2">
          <h1 className=" text-link-base">Айди локации квестов</h1>
            <input
              id="quizId"
              name="quizId"
              type="number"
              value={quest.quizId}
              onChange={handleChange}
              className=" ml-5 bg-hint-base rounded-md  text-hint-base px-4 py-2"
              required
            />
          </div>
          <div className="space-y-2">
          <h1 className=" text-link-base">Url картинки</h1>
            <input
              id="image"
              name="image"
              type="url"
              value={quest.image }
              onChange={handleChange}
              className=" ml-5 bg-hint-base rounded-md  text-hint-base px-4 py-2"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
            title=""
              type="button"
              onClick={() => setQuest(prev => ({ ...prev, rebus: !quest.rebus }))}
              className={`w-10 h-6 flex items-center ${
                quest.rebus ? " bg-button-base" : "bg-gray-200"
              } rounded-full p-1 transition-colors duration-300 focus:outline-none`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  quest.rebus ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
            <h1 className=" text-link-base">Ребус</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setQuest(prev => ({ ...prev, todo: !quest.todo }))}
              className={`w-10 h-6 flex items-center ${
                quest.todo ? " bg-button-base" : "bg-gray-200"
              } rounded-full p-1 transition-colors duration-300 focus:outline-none`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  quest.todo ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
            <h1 className=" text-link-base">Поручение?</h1>
          </div>
          <button type="submit" className="w-full bg-button-base rounded-md py-4 text-button-base text-2xl">Создать задание</button>
        </form>
      </div>
    </div>
  )
}