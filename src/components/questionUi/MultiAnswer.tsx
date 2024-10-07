import { Quiz} from "@/app/types/Main"
import { AnimatePresence, motion } from "framer-motion"

interface MultipleChoiceQuestionProps {
    data: Quiz
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleAnswerClick: (answer: string) => void
    currentQuestion: number
    quizLength: number
    setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>
    getRandomEncouragingPhrase: () => string
  }
  
  export function MultipleChoiceQuestion({
    data,
    isOpen,
    setIsOpen,
    handleAnswerClick,
    currentQuestion,
    quizLength,
    setCurrentQuestion,
    getRandomEncouragingPhrase,
  }: MultipleChoiceQuestionProps) {
    return (
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="w-full"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full text-xl mb-4 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
          >
            {data.todo ? getRandomEncouragingPhrase() : data.question}
          </motion.button>
          
          {data.todo ? (
            <button
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-full text-xl hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
              onClick={() => {
                if (currentQuestion < quizLength - 1) {
                  setCurrentQuestion(currentQuestion + 1)
                }
              }}
            >
              Следующее
            </button>
          ) : (
            <motion.ul
              variants={{
                open: {
                  clipPath: "inset(0% 0% 0% 0% round 10px)",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.7,
                    delayChildren: 0.3,
                    staggerChildren: 0.05
                  }
                },
                closed: {
                  clipPath: "inset(10% 50% 90% 50% round 10px)",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3
                  }
                }
              }}
              style={{ pointerEvents: isOpen ? "auto" : "none" }}
              className="space-y-2"
            >
              {data.variants && data.variants.map((variant: string, index: number) => (
                <motion.li
                  key={index}
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    },
                    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
                  }}
                  onClick={() => handleAnswerClick(variant)}
                  className="cursor-pointer bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-full text-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  tabIndex={0}
                  role="button"
                  aria-label={`Вариант ответа ${index + 1}: ${variant}`}
                >
                  {index + 1}: {variant}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </AnimatePresence>
    )
  }