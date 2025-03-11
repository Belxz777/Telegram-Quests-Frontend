"use client"

import { addImage } from "@/server/teamManage"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Confetti from "./Confetti"
import ErrorPage from "./errorMessage/error"
import Reroute from "./Reroute"

type Props = {
  quizData: any[]
  userAnswers: string[]
  todoItems: any[]
  answers: string[]
  location?: number
}

const Result = (props: Props) => {
  const [correct, setCorrect] = useState<number | null>(null)
  const [isReroute, setIsReroute] = useState(false)
  const [error, setError] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<File | null>(null)
  const [isAddedPhoto, setIsAddedPhoto] = useState(false)
  const [loading, setLoading] = useState(false)

  // Вычисление количества правильных ответов
  const calculateScore = () => {
    const correctAnswers = props.answers.filter(
      (answer: any) => typeof answer === "object" && "isCorrect" in answer && answer,
    ).length
alert(correctAnswers)
    setCorrect(correctAnswers + 1)

    if (correctAnswers === props.answers.length - 1) {
      return `Ты ответил правильно на ${correctAnswers + 1} из ${props.answers.length}! Молодцы!!!`
    } else {
      return `Ты ответил правильно на ${correctAnswers + 1} из ${props.answers.length}! В следующий раз точно получится!!!`
    }
  }
useEffect(() => {
  calculateScore()
},[]);
  // Отправка фотографии
  const sendPhoto = async () => {
    const teamName = localStorage.getItem("team") || ""
    setLoading(true)

    if (!correct) {
      alert("Не удалось определить количество правильных ответов")
      setLoading(false)
      return
    }

    if (!photoUrl) {
      alert("Фотография не выбрана")
      setLoading(false)
      return
    }


    const location = props.location || 0
    
    const response = await addImage(teamName, photoUrl, location, correct.toString(), props.answers)

    if (!response) {
      setLoading(false)
      setError(true)
      setIsAddedPhoto(false)
      return
    }

    setLoading(false)
    setIsAddedPhoto(true)
  }

  // Если есть ошибка и нет перенаправления, показываем страницу ошибки
  if (error && !isReroute) {
    return (
      <ErrorPage
        linkHref="/qrscanner"
        linkText="Сканируйте еще раз"
        errorMessage="Произошла ошибка при отправке фотографии (ошибка с форматом фотографии, обратитесь к администратору)"
      />
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh] bg-scin-base px-4 md:px-6">
      <div className="max-w-md w-full space-y-6 bg-white rounded-lg shadow-lg p-6">
        {isReroute && <Reroute text="Переход..." />}

        <div className="text-center space-y-4">
          {/* Индикатор загрузки */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

          {/* Если фото успешно добавлено */}
          {isAddedPhoto ? (
            <>
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                <h1 className="text-3xl font-bold tracking-tight">Задание успешно выполнено!</h1>
                <p className="text-4xl font-extrabold mt-2">Правильных ответов: {correct}</p>
              </div>

              <Link
                className="block w-full px-4 py-3 text-xl font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                href="/period"
                onClick={() => setIsReroute(true)}
              >
                Перейти к следующему квесту
              </Link>

              <Confetti />
            </>
          ) : (
            <>
              {/* Последнее задание и загрузка фото */}
              <div>
                {props.todoItems.length > 0 && props.todoItems[props.todoItems.length - 1]?.question && (
                  <>
                    <h1 className="text-xl font-bold text-gray-700">Последнее задание:</h1>
                    <h2 className="text-2xl font-extrabold text-blue-600 mt-1">
                      {props.todoItems[props.todoItems.length - 1].question}
                    </h2>
                  </>
                )}
              </div>

              {/* Область загрузки фото */}
              <div className="mt-4">
                <div className="flex justify-center flex-col w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg overflow-hidden">
                  {!photoUrl ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="text-gray-600 mb-2">Загрузите фотографию выполненного задания</p>
                      <label
                        className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        htmlFor="file"
                      >
                        Выбрать файл
                      </label>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={URL.createObjectURL(photoUrl) || "/placeholder.svg"}
                        alt="Загруженное фото"
                        fill
                        className="object-contain rounded-lg"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        onClick={() => setPhotoUrl(null)}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <input
                    className="hidden"
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files
                      if (files && files.length > 0) {
                        setPhotoUrl(files[0])
                      }
                    }}
                  />
                </div>
              </div>

              {/* Кнопка отправки */}
              <button
                className="w-full px-4 py-3 text-xl font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={() => sendPhoto()}
                disabled={!photoUrl}
              >
                Отправить
              </button>

              {/* Результаты квиза */}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-xl font-bold text-gray-700 mb-3">Ваши ответы:</h3>
                <ul className="space-y-2">
                  {props.answers.map((answer, index) => (
                    <li key={index} className="bg-gray-100 p-3 rounded-lg text-left">
                      <p className="font-bold">{props.quizData[index]?.quizIn || `Вопрос ${index + 1}`}</p>
                      <p className="text-blue-600">{answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Result

