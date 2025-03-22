
import { quiztype } from '@/app/types/Main';
import QuizInterface from './questionUi/QuizInter';

type Props = {
    quizData:quiztype[] | quiztype
  }

  // TODO разобраться сделась проверить как работает с ребусом вообщем 
const  Quiz= (props: Props) => {
  // const getRandomEncouragingPhrase =()=>{
  //   const encouragingPhrases = [
  //     "Отличная работа, команда! Так держать!",
  //     "Вы на верном пути! Продолжайте в том же духе!",
  //     "Каждый шаг приближает вас к победе! Не сдавайтесь!",
  //     "Вы справляетесь просто потрясающе!",
  //     "Двигайтесь дальше!",
  //     "Продолжайте в том же духе!",
  //   ];
    
  //   return encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)];
    
  // }
//   const [answers, setAnswers] = useState<string[]>([]);
// const [isOpen, setIsOpen] = useState(true);
// const [currentQuestion, setCurrentQuestion] = useState<number>(0);
// const [userAnswers, setUserAnswers] = useState<{ question: string; answer: string; isCorrect: boolean }[]>([]);
// const [showResult, setShowResult] = useState<boolean>(false);
// const [rebus, setrebus] = useState('')
// const [todo, settodo] = useState<any>(null)
// const handleAnswerClick = (selectedVariant: string) => { 
//   if (answers.includes(selectedVariant)) {
//     return;
//   }
//   setAnswers([...answers, selectedVariant]);
  // if(props.quizData[currentQuestion].rebus){
  //   setrebus(selectedVariant)
  // }
  // if(props.quizData[currentQuestion].todo){
  //   settodo(selectedVariant)
  // }
const arrayedifnot = Array.isArray(props.quizData) ? props.quizData : [props.quizData]
return (
  <main className="container mx-auto p-4">
  <QuizInterface quizData={arrayedifnot} />
</main>
)
}
export default Quiz