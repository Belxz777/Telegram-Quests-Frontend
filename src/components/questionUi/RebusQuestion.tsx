import { quiztype } from "@/app/types/Main"

interface RebusQuestionProps {
    data: quiztype
    rebus: string
    setRebus: React.Dispatch<React.SetStateAction<string>>
    handleAnswerClick: (answer: string) => void
  }
  
export   function RebusQuestion({ data, rebus, setRebus, handleAnswerClick }: RebusQuestionProps) {
    return (
      <div className="flex flex-col items-center">
        {data.question && (
          <p className="text-xl font-bold text-center mb-4 text-gray-800">{data.question}</p>   
        )}
        {data.image && <img src={data.image} alt="Ребус" className="max-w-full  h-auto mb-4 rounded-lg" />}
        <input
          type="text"
          placeholder="Введите ответ"
          className="w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full text-xl mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={rebus}
          onChange={(e) => setRebus(e.target.value.toLowerCase())}
          minLength={3}
          required
          aria-label="Ответ на ребус"
        />
        <button
          onClick={() => handleAnswerClick(rebus)}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full text-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          Отправить
        </button>
      </div>
    )
  }