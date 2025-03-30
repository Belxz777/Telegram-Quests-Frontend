
// interface Props {
//   params: { team: string };
// }

// export default function Component(params: Props) {
//   const [teamData, setTeamData] = useState<Team  |  null>();
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const backButton = useBackButton();

//   useEffect(() => {
//     fetchData();
//     backButton.show();
//     backButton.on("click", () => {
//       router.push("/adminPanel");;
//     });
//     // Очистка обработчика события при размонтировании компонента
//   }, []);

//   const fetchData = async () => {
//     try {
//       const data = await findTeam(params.params.team);
//       if('status' in data ) {
//         alert(`Возникла ошибка ${data.status} вы будете переброщены обратно через 5 секунд`)
//         setLoading(false);
// setTimeout(()=>{
//   router.push("/adminPanel")
// },5000)
//       }
//       else{
//         setTeamData(data);
//         setLoading(false);
//       }
//     } catch (error) {
//       alert(`Возникла ошибка ${error} вы будете переброщены обратно через 5 секунд`)
//       setLoading(false);
// setTimeout(()=>{
// router.push("/adminPanel")
// },5000)
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       {loading ? (
//         <Loading text="Загрузка данных подождите..." />
//       ) : (
//         <>
//           <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b   bg-hint-base px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//             <div className="relative ml-auto flex-1 md:grow-0">
//               <h1 className="text-2xl md:text-5xl font-bold text-link-base select-none overflow-hidden">
//                 Команда: {teamData?.name}
//               </h1>
//             </div>
//           </header>
//           <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//             <table className="w-full border-collapse bg-scin-base shadow-md rounded-lg overflow-hidden border-base">
//               <thead>
//                 <tr className="bg-hint-base">
//                   <th className="px-6 py-3 text-left text-lg font-bold text-link-base">
//                     Квест
//                   </th>
//                   <th className="px-6 py-3 text-left text-lg font-bold text-link-base">
//                     Ответы
//                   </th>
//                   <th className="px-6 py-3 text-left text-xl font-extrabold text-link-base">
//                 <GoCheck />
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {teamData && teamData.solved.length > 0 ? (
//                   teamData.solved.map((solvedItem: string, index: number) => (
//                     <tr
//                       key={`${teamData.id}-${index}`}
//                       className={index % 2 === 0 ? " bg-scin-base" : "bg-scin-base"}
//                     >
//                       <td className="border px-6 py-4 text-lg text-scin-base">
//                         {solvedItem}
//                       </td>
//                       <td className="border px-6 py-4 text-sm text-scin-base">
//                         <ul className="list-disc list-inside  font-extrabold">
//                           {teamData.answers[index]}
//                         </ul>
//                       </td>
//                       <td className="border px-4 py-4 text-scin-base    text-lg">
//                       <span className=" font-extrabold text-scin-base"> {teamData.results[index]} </span>  б.
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={3}
//                       className="px-6 py-4 text-center text-sm  text-link-base"
//                     >
//                       Нет данных для отображения.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </main>
//         </>
//       )}
//     </div>
//   );
// }

// function SearchIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }
"use client"
import {  Team } from "@/app/types/Main";
import Loading from "@/components/Loading";
import { findTeam } from "@/server/team/find";
import { useBackButton } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoCheck } from "react-icons/go";


interface Props {
    params: { team: string };
  }
  
  export default function Component(params: Props) {
    const [teamData, setTeamData] = useState<Team  |  null>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const backButton = useBackButton();
  
    useEffect(() => {
      fetchData();
      backButton.show();
      backButton.on("click", () => {
        router.push("/adminPanel");;
      });
      // Очистка обработчика события при размонтировании компонента
    }, []);
  
    const fetchData = async () => {
      try {
        const data = await findTeam(params.params.team);
        if('status' in data ) {
          alert(`Возникла ошибка ${data.status} вы будете переброщены обратно через 5 секунд`)
          setLoading(false);
  setTimeout(()=>{
    router.push("/adminPanel")
  },5000)
        }
        else{
          setTeamData(data);
          setLoading(false);
        }
      } catch (error) {
        alert(`Возникла ошибка ${error} вы будете переброщены обратно через 5 секунд`)
        setLoading(false);
  setTimeout(()=>{
  router.push("/adminPanel")
  },5000)
      }
    };
  
    return (
      <div className="min-h-screen   text-link-base bg-scin-base font-sans">
        {loading ? (
          <Loading text="Загрузка данных подождите..." />
        ) : (
          <>    
               <header className="sticky top-0 z-10 w-full border-b  bg-scin shadow-sm">
        <div className="flex h-14 items-center px-4">
          <h1 className="text-lg font-semibold">Админ панель</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-md mx-auto p-4">
        {/* Team header */}
        <div className=" rounded-lg shadow-md mb-6 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Команда: {teamData?.name}</h2>
            <span className="px-2 py-1 text-sm bg-gray-100 rounded-full border border-gray-200">ID: {teamData?.id}</span>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Прогресс команды</h2>

        {/* Team progress items */}
        {teamData?.solved.map((location, index) => (
          <div key={index} className="bg-scin-base/20 rounded-lg border-2 border-gray-100 shadow-md mb-4 overflow-hidden">
            <div className="p-4  ">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">Локация #{location}</h3>
                <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  Результат: {teamData.results[index]}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Ответы:</h4>
                <p className=" text-xl font-bold text-hint-base whitespace-pre-line">{teamData.answers[index]}</p>
              </div>
            </div>
          </div>
        ))}
      </main>
 </>
  )
}
</div>
)
}


