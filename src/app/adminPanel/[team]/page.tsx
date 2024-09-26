"use client";
import { someError, Team } from "@/app/types/Main";
import Loading from "@/components/Loading";
import { getTeamDataByName } from "@/server/getAllTeamData";
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
      const data = await getTeamDataByName(params.params.team);
      setTeamData(data);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке данных команды:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {loading ? (
        <Loading text="Загрузка данных подождите..." />
      ) : (
        <>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b   bg-hint-base px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">
              <h1 className="text-2xl md:text-5xl font-bold text-link-base select-none overflow-hidden">
                Команда: {teamData?.name}
              </h1>
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <table className="w-full border-collapse bg-scin-base shadow-md rounded-lg overflow-hidden border-base">
              <thead>
                <tr className="bg-hint-base">
                  <th className="px-6 py-3 text-left text-lg font-bold text-link-base">
                    Квест
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-link-base">
                    Ответы
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-extrabold text-link-base">
                <GoCheck />
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamData && teamData.solved.length > 0 ? (
                  teamData.solved.map((solvedItem: string, index: number) => (
                    <tr
                      key={`${teamData.id}-${index}`}
                      className={index % 2 === 0 ? " bg-scin-base" : "bg-scin-base"}
                    >
                      <td className="border px-6 py-4 text-lg text-scin-base">
                        {solvedItem}
                      </td>
                      <td className="border px-6 py-4 text-sm text-scin-base">
                        <ul className="list-disc list-inside  font-extrabold">
                          {teamData.answers[index]}
                        </ul>
                      </td>
                      <td className="border px-4 py-4 text-scin-base    text-lg">
                      <span className=" font-extrabold text-scin-base"> {teamData.results[index]} </span>  б.
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-sm  text-link-base"
                    >
                      Нет данных для отображения.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </main>
        </>
      )}
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
