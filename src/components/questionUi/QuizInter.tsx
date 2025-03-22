"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import Result from "../Result"
import { quiztype } from "@/app/types/Main"
import { getRandomEncouragingPhrase } from "../utils/func"


// Типы данных
interface QuizQuestion {
  quizIn: string
  question?: string
  variants?: string[]
  rebus?: boolean
  image?: string
  todo?: boolean
}

interface QuizProps {
  quizData: quiztype[] 
}

// Компонент квеста
export default function QuizInterface(props: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [rebusAnswer, setRebusAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [todoItems, setTodoItems] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<string[]>([])

  // Варианты анимации для списка
  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }

  // Варианты анимации для элементов списка
  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  // Случайные фразы поддержки

useEffect(() => {
  
  if (!props.quizData) {
    alert("Задания не найдены")
    return
  }
},[])
  // Обработка клика по ответу
  const handleAnswerClick = (answer: string) => {
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = answer
    setUserAnswers(newUserAnswers)

    setAnswers([...answers, answer])

    const currentQuizItem = props.quizData[currentQuestion]
    if ('todo' in currentQuizItem && currentQuizItem.todo) {
      setTodoItems([...todoItems, currentQuizItem as unknown as QuizQuestion])
    }

    // Переход к следующему вопросу или показ результатов
    if (currentQuestion < props.quizData.length - 1) {
    
      setCurrentQuestion(currentQuestion + 1)
      setRebusAnswer("")
      setIsOpen(false)
    } else {
      setShowResult(true)
      alert('end')
    }
  }
  // Переход к следующему вопросу для todo-типа вопросов
  const handleNextQuestion = () => {
    const currentItem = props.quizData[currentQuestion]
    if ('todo' in currentItem && currentItem.todo) {
      setTodoItems([...todoItems, currentItem as unknown as QuizQuestion])
    }

    if (currentQuestion < props.quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }
if (showResult) {
    return <Result quizData={props.quizData} userAnswers={userAnswers} todoItems={todoItems} answers={answers} />
  }

  const currentQuizItem = props.quizData[currentQuestion] as unknown as quiztype

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Заголовок квеста */}
      <div className="bg-hint-base  text-button-base p-4 text-center">
        <h1 className="text-2xl font-bold">Локация:</h1>
        <p className="text-xl ">{currentQuizItem.location.name.toString()}</p>
      </div>

      <div className="p-4">
        {currentQuizItem.rebus ? (
          <RebusQuestion
            question={currentQuizItem.question}
            image={currentQuizItem.image}
            rebusAnswer={rebusAnswer}
            setRebusAnswer={setRebusAnswer}
            handleAnswerClick={handleAnswerClick}
          />
        ) : (
          <VariantsQuestion
            currentQuizItem={currentQuizItem}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            variants={variants}
            itemVariants={itemVariants}
            handleAnswerClick={handleAnswerClick}
            handleNextQuestion={handleNextQuestion}
            getRandomEncouragingPhrase={getRandomEncouragingPhrase}
          />
        )}
      </div>
    </div>
  )
}// Компонент для вопросов с вариантами ответов
function VariantsQuestion({
  currentQuizItem,
  isOpen,
  setIsOpen,
  variants,
  itemVariants,
  handleAnswerClick,
  handleNextQuestion,
  getRandomEncouragingPhrase,
}: {
  currentQuizItem: any
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  variants: any
  itemVariants: any
  handleAnswerClick: (variant: string) => void
  handleNextQuestion: () => void
  getRandomEncouragingPhrase: () => string
}) {
  return (
    <div className="flex flex-col items-center">
      {currentQuizItem.todo ? (
        <>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-hint-base">{getRandomEncouragingPhrase()}</h2>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleNextQuestion}
            className="bg-button-base text-button-base  font-bold py-3 px-6 rounded-lg text-xl flex items-center"
          >
            Следующее 
          </motion.button>
        </>
      ) : (
        <>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-button-base text-button-base  font-bold py-3 px-6 rounded-lg text-xl mb-4 w-full text-center"
          >
            {currentQuizItem.question}
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul variants={variants} initial="closed" animate="open" exit="closed" className="w-full space-y-3">
                {currentQuizItem.variants?.map((variant: string, index: number) => (
                  <motion.li
                    variants={itemVariants}
                    key={index}
                    onClick={() => handleAnswerClick(variant)}
                    className="relative cursor-pointer bg-hint-base  text-button-base font-bold py-4 px-6 rounded-lg text-xl  delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 transition-colors"
                  >
                    {variant}
                    <span className="absolute top-2 right-3 text-sm bg-white text-gray-600 w-6 h-6 flex items-center justify-center rounded-full">
                      {index + 1}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
// Компонент для ребусов
function RebusQuestion({ question, image, rebusAnswer, setRebusAnswer, handleAnswerClick }: {
  question?: string
  image?: string
  rebusAnswer: string
  setRebusAnswer: (value: string) => void
  handleAnswerClick: (answer: string) => void
}) {
  return (
    <div className="flex flex-col items-center">
      {question ? (
        <h2 className="text-2xl font-bold  text-link-base text-center mb-4">{question}</h2>
      ) : (
        <p className="text-xl font-bold text-link-base mb-4">Ребус</p>
      )}

      {image && (
        <img src={image || "/placeholder.svg"} alt="Картинка ребуса" className="rounded-lg mb-4 max-w-full select-none" />
      )}

      <div className="w-full space-y-3">
        <input
          placeholder="Введите ответ"
          className="w-full bg-hint-base  text-button-base font-bold py-3 px-4 rounded-full text-xl placeholder-blue-200"
          value={rebusAnswer}
          minLength={3}
          required
          onChange={(e) => setRebusAnswer(e.target.value.toLowerCase())}
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleAnswerClick(rebusAnswer)}
          className="w-full bg-button-base  text-button-base font-bold py-3 px-4 rounded-full text-xl flex items-center justify-center"
          disabled={!rebusAnswer.trim()}
        >
          Отправить 
        </motion.button>
      </div>
    </div>
  )
}

// Компонент для отображения результатов
