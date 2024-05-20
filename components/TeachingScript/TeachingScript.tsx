import { useEffect, useState } from "react"
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io"
import { MoonLoader } from "react-spinners"
import { toast } from "react-toastify"
import { count } from "console"
import { useAppContext } from "app/context/AppContext"
import { generateScript, stopAllPromises } from "app/services/callapi"
import ExpandedScript from "./ExpandedScript"
import { IoIosRefresh } from "react-icons/io"

import Image from "next/image"

const TeachingScript = () => {
  const {
    documentData,
    tableOfContent,
    documentId,
    expandedTs,
    setExpandedTs,
    activeScript,
    setActiveScript,
    eachIndex,
    setEachIndex,
  } = useAppContext()
   const teaching_script = JSON.parse(localStorage.getItem("teaching_script"))
   const [script, setScript] = useState(teaching_script?.length > 0 ? teaching_script : [])
   const [headingLoading, setHeadingLoading] = useState(false)
   const [index, setIndex] = useState(0)
   const [activeHeading, setActiveHeading] = useState(
     tableOfContent?.length > 0 ? tableOfContent[0]?.name : undefined
   )
   const [nextHeading, setNextHeading] = useState(tableOfContent?.length > 0 ? tableOfContent[0]?.name : undefined)
   let count = 0
   useEffect(() => {
     if (script?.length < 1 && tableOfContent && tableOfContent?.length > 0) {
       makeRequests()
     }
   }, [tableOfContent])
   const makeRequests = async () => {
     console.time(".map()")
     setHeadingLoading(true)
     await Promise.all(
       tableOfContent?.map(async (each: any, index: any) => {
         setActiveHeading(each?.heading)
         let data = await callApi(each?.heading, each?.id)
         setNextHeading(tableOfContent[index + 1]?.name)
         if (data) {        
           setScript((ps: any) => [...ps, data])
         }
       })
     )
     setHeadingLoading(false)
     console.timeEnd(".map()")
   }
   useEffect(() => {
     if (script && script?.length > 0) {
       localStorage.setItem("teaching_script", JSON.stringify(script))
     }
   }, [script])

   const callApi = async (activeHeading: any, heading_id:any) => {
     try {
       const data = {
         heading_id:heading_id,
         document_id: documentId || documentData?.documentId,
       }
       let result = await generateScript(data)
       if (result?.success) {
         return result?.data
       }
     } catch (e) {
       console.log("error", e)
     }
   }

   const handleRegenerate = () => {
     if (script && script?.length > 0) {
       localStorage.removeItem("teaching_script")
       setScript([])
       makeRequests()
     }
   }
  return (
    <div className="px-auto flex h-full flex-col items-start md:px-3">
      {expandedTs && <ExpandedScript activeScript={activeScript} setExpandedTs={setExpandedTs} />}
      {!expandedTs && (
        <>
          <div className="mx-auto flex w-[90%] flex-row items-center justify-between md:hidden">
            <div className="flex flex-row items-center justify-around gap-2">
              <h1 className="font-montHeavy text-[14px] leading-[18px] text-[#6E808E]">Your scripts</h1>
              <button
                className="flex max-w-[250px] flex-row items-center justify-around gap-2 rounded-[15px] bg-[#66C7C9] p-1 text-[16px] font-[700] text-white md:px-3 md:py-2"
                onClick={() => handleRegenerate()}
              >
                <IoIosRefresh size={24} />
                <span className="hidden md:block">Regenerate</span>
              </button>
            </div>
            <div className="flex flex-row items-center gap-2">
              <button className="h-auto w-auto rounded-[10px] bg-[#83D5D6] p-[10px]">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.02882 8.7074L0.293233 8.56108L0.293233 8.56108L1.02882 8.7074ZM2.2074 7.52882L2.06108 6.79323H2.06108L2.2074 7.52882ZM2.2074 11.2211L2.35372 10.4855H2.35371L2.2074 11.2211ZM1.02882 10.0426L0.293233 10.1889H0.293233L1.02882 10.0426ZM12.9711 10.0426L13.7067 10.189L12.9711 10.0426ZM11.7926 11.2211L11.939 11.9567L11.7926 11.2211ZM12.9711 8.7074L13.7067 8.56108L12.9711 8.7074ZM11.7926 7.52882L11.939 6.79323H11.939L11.7926 7.52882ZM1.02882 1.9574L0.293233 1.81108L1.02882 1.9574ZM2.2074 0.778822L2.06108 0.0432331L2.2074 0.778822ZM2.2074 4.47107L2.35372 3.73548H2.35371L2.2074 4.47107ZM1.02882 3.2926L1.76441 3.14628L1.02882 3.2926ZM12.9711 3.29264L12.2355 3.14632V3.14632L12.9711 3.29264ZM11.7926 4.47107L11.939 5.20666L11.7926 4.47107ZM12.9711 1.9574L12.2355 2.10371V2.10372L12.9711 1.9574ZM11.7926 0.778822L11.939 0.0432332L11.939 0.043233L11.7926 0.778822ZM11.125 10.5H2.875V12H11.125V10.5ZM2.875 8.25H11.125V6.75H2.875V8.25ZM1.75 9.37503C1.75 8.99059 1.75363 8.9079 1.76441 8.85371L0.293233 8.56108C0.246367 8.79669 0.25 9.06249 0.25 9.37503H1.75ZM2.875 6.75C2.56245 6.75 2.29669 6.74637 2.06108 6.79323L2.35371 8.26441C2.4079 8.25363 2.49057 8.25 2.875 8.25V6.75ZM1.76441 8.85371C1.82359 8.5562 2.0562 8.32359 2.35371 8.26441L2.06108 6.79323C1.16853 6.97077 0.470773 7.66853 0.293233 8.56108L1.76441 8.85371ZM2.875 10.5C2.49099 10.5 2.40799 10.4963 2.35372 10.4855L2.06108 11.9567C2.2966 12.0035 2.56203 12 2.875 12V10.5ZM0.25 9.37503C0.25 9.68758 0.246368 9.95331 0.293233 10.1889L1.76441 9.89629C1.75363 9.8421 1.75 9.75946 1.75 9.37503H0.25ZM2.35371 10.4855C2.05612 10.4263 1.82358 10.1937 1.76441 9.89629L0.293233 10.1889C0.470789 11.0816 1.1686 11.7791 2.06108 11.9567L2.35371 10.4855ZM12.2499 9.375C12.2499 9.75944 12.2463 9.84213 12.2355 9.89632L13.7067 10.189C13.7535 9.95334 13.7499 9.68754 13.7499 9.375H12.2499ZM11.125 12C11.438 12 11.7034 12.0035 11.939 11.9567L11.6463 10.4855C11.592 10.4963 11.509 10.5 11.125 10.5V12ZM12.2355 9.89632C12.1763 10.1938 11.9438 10.4263 11.6463 10.4855L11.939 11.9567C12.8315 11.7791 13.5291 11.0815 13.7067 10.189L12.2355 9.89632ZM13.7499 9.375C13.7499 9.06246 13.7535 8.79669 13.7067 8.56108L12.2355 8.85371C12.2463 8.9079 12.2499 8.99057 12.2499 9.375H13.7499ZM11.125 8.25C11.5094 8.25 11.5921 8.25363 11.6463 8.26441L11.939 6.79323C11.7033 6.74637 11.4375 6.75 11.125 6.75V8.25ZM13.7067 8.56108C13.5291 7.66863 12.8316 6.97079 11.939 6.79323L11.6463 8.26441C11.9437 8.32357 12.1763 8.5561 12.2355 8.85371L13.7067 8.56108ZM11.125 3.75H2.875V5.25H11.125V3.75ZM2.875 1.5H11.125V0H2.875V1.5ZM1.75 2.62503C1.75 2.24059 1.75363 2.1579 1.76441 2.10372L0.293233 1.81108C0.246367 2.04669 0.25 2.31249 0.25 2.62503H1.75ZM2.875 0C2.56245 0 2.29669 -0.00363249 2.06108 0.0432331L2.35372 1.51441C2.4079 1.50363 2.49057 1.5 2.875 1.5V0ZM1.76441 2.10372C1.82359 1.8062 2.0562 1.57359 2.35372 1.51441L2.06108 0.0432331C1.16853 0.220773 0.470773 0.918526 0.293233 1.81108L1.76441 2.10372ZM2.875 3.75C2.49099 3.75 2.40799 3.74628 2.35372 3.73548L2.06108 5.20666C2.2966 5.25351 2.56203 5.25 2.875 5.25V3.75ZM0.25 2.62503C0.25 2.93759 0.246368 3.20331 0.293233 3.43892L1.76441 3.14628C1.75363 3.0921 1.75 3.00946 1.75 2.62503H0.25ZM2.35371 3.73548C2.05612 3.67629 1.82358 3.44373 1.76441 3.14628L0.293233 3.43892C0.470789 4.33155 1.1686 5.02913 2.06108 5.20666L2.35371 3.73548ZM12.2499 2.625C12.2499 3.00944 12.2463 3.09213 12.2355 3.14632L13.7067 3.43895C13.7535 3.20334 13.7499 2.93754 13.7499 2.625H12.2499ZM11.125 5.25C11.438 5.25 11.7034 5.25351 11.939 5.20666L11.6463 3.73548C11.592 3.74628 11.509 3.75 11.125 3.75V5.25ZM12.2355 3.14632C12.1763 3.44384 11.9438 3.6763 11.6463 3.73548L11.939 5.20666C12.8315 5.02912 13.5291 4.33151 13.7067 3.43895L12.2355 3.14632ZM13.7499 2.625C13.7499 2.31246 13.7535 2.04669 13.7067 1.81108L12.2355 2.10372C12.2463 2.1579 12.2499 2.24057 12.2499 2.625H13.7499ZM11.125 1.5C11.5094 1.5 11.5921 1.50363 11.6463 1.51441L11.939 0.043233C11.7033 -0.00363261 11.4375 0 11.125 0V1.5ZM13.7067 1.81108C13.5291 0.918627 12.8316 0.220793 11.939 0.0432332L11.6463 1.51441C11.9437 1.57357 12.1763 1.8061 12.2355 2.10371L13.7067 1.81108Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button className="h-auto w-auto rounded-[10px] bg-[#83D5D6] p-[10px]">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.0426 3.02882L13.189 2.29323L13.189 2.29323L13.0426 3.02882ZM14.2211 4.2074L13.4855 4.35371V4.35372L14.2211 4.2074ZM10.5288 4.2074L9.79323 4.06108V4.06108L10.5288 4.2074ZM11.7074 3.02882L11.5611 2.29323L11.5611 2.29323L11.7074 3.02882ZM11.7074 14.9711L11.5611 15.7067L11.7074 14.9711ZM10.5288 13.7926L9.79323 13.939V13.939L10.5288 13.7926ZM13.0426 14.9711L13.1889 15.7067L13.0426 14.9711ZM14.2211 13.7926L14.9567 13.939V13.939L14.2211 13.7926ZM6.29264 3.02882L6.43895 2.29323L6.29264 3.02882ZM7.47107 4.2074L6.73548 4.35371V4.35372L7.47107 4.2074ZM3.77882 4.2074L3.04323 4.06108L3.04323 4.06108L3.77882 4.2074ZM4.9574 3.02882L5.10372 3.76441H5.10372L4.9574 3.02882ZM4.9574 14.9711L5.10372 14.2355H5.10371L4.9574 14.9711ZM3.77882 13.7926L3.04323 13.939H3.04323L3.77882 13.7926ZM6.2926 14.9711L6.14629 14.2355H6.14628L6.2926 14.9711ZM7.47107 13.7926L8.20666 13.939L7.47107 13.7926ZM11.25 13.125V4.875H9.75V13.125H11.25ZM13.5 4.875V13.125H15V4.875H13.5ZM12.375 3.75C12.7594 3.75 12.8421 3.75363 12.8963 3.76441L13.189 2.29323C12.9533 2.24637 12.6875 2.25 12.375 2.25V3.75ZM15 4.875C15 4.56203 15.0035 4.2966 14.9567 4.06108L13.4855 4.35372C13.4963 4.40799 13.5 4.49099 13.5 4.875H15ZM12.8963 3.76441C13.1937 3.82357 13.4263 4.0561 13.4855 4.35371L14.9567 4.06108C14.7791 3.16863 14.0816 2.47079 13.189 2.29323L12.8963 3.76441ZM11.25 4.875C11.25 4.49057 11.2536 4.4079 11.2644 4.35371L9.79323 4.06108C9.74637 4.29669 9.75 4.56245 9.75 4.875H11.25ZM12.375 2.25C12.0625 2.25 11.7967 2.24637 11.5611 2.29323L11.8537 3.76441C11.9079 3.75363 11.9906 3.75 12.375 3.75V2.25ZM11.2644 4.35371C11.3236 4.0562 11.5562 3.82359 11.8537 3.76441L11.5611 2.29323C10.6685 2.47077 9.97077 3.16853 9.79323 4.06108L11.2644 4.35371ZM12.375 14.2499C11.9906 14.2499 11.9079 14.2463 11.8537 14.2355L11.5611 15.7067C11.7967 15.7535 12.0625 15.7499 12.375 15.7499V14.2499ZM9.75 13.125C9.75 13.4375 9.74637 13.7033 9.79323 13.939L11.2644 13.6463C11.2536 13.5921 11.25 13.5094 11.25 13.125H9.75ZM11.8537 14.2355C11.5561 14.1763 11.3236 13.9437 11.2644 13.6463L9.79323 13.939C9.97079 14.8316 10.6686 15.5291 11.5611 15.7067L11.8537 14.2355ZM12.375 15.7499C12.6876 15.7499 12.9533 15.7535 13.1889 15.7067L12.8963 14.2355C12.8421 14.2463 12.7595 14.2499 12.375 14.2499V15.7499ZM13.5 13.125C13.5 13.509 13.4963 13.592 13.4855 13.6463L14.9567 13.939C15.0035 13.7034 15 13.438 15 13.125H13.5ZM13.1889 15.7067C14.0815 15.5291 14.7791 14.8315 14.9567 13.939L13.4855 13.6463C13.4263 13.9438 13.1938 14.1763 12.8963 14.2355L13.1889 15.7067ZM4.5 13.125V4.875H3V13.125H4.5ZM6.75 4.875V13.125H8.25V4.875H6.75ZM5.625 3.75C6.00944 3.75 6.09213 3.75363 6.14632 3.76441L6.43895 2.29323C6.20334 2.24637 5.93754 2.25 5.625 2.25V3.75ZM8.25 4.875C8.25 4.56203 8.25351 4.2966 8.20666 4.06108L6.73548 4.35372C6.74628 4.40799 6.75 4.49099 6.75 4.875H8.25ZM6.14632 3.76441C6.44373 3.82357 6.67628 4.0561 6.73548 4.35371L8.20666 4.06108C8.02914 3.16863 7.33161 2.47079 6.43895 2.29323L6.14632 3.76441ZM4.5 4.875C4.5 4.49057 4.50363 4.4079 4.51441 4.35372L3.04323 4.06108C2.99637 4.29669 3 4.56245 3 4.875H4.5ZM5.625 2.25C5.31245 2.25 5.04669 2.24637 4.81108 2.29323L5.10372 3.76441C5.1579 3.75363 5.24057 3.75 5.625 3.75V2.25ZM4.51441 4.35372C4.57359 4.0562 4.8062 3.82359 5.10372 3.76441L4.81108 2.29323C3.91853 2.47077 3.22077 3.16853 3.04323 4.06108L4.51441 4.35372ZM5.62503 14.2499C5.2406 14.2499 5.1579 14.2463 5.10372 14.2355L4.81108 15.7067C5.04669 15.7535 5.31249 15.7499 5.62503 15.7499V14.2499ZM3 13.125C3 13.4375 2.99637 13.7033 3.04323 13.939L4.51441 13.6463C4.50363 13.5921 4.5 13.5094 4.5 13.125H3ZM5.10371 14.2355C4.8061 14.1763 4.57357 13.9437 4.51441 13.6463L3.04323 13.939C3.22079 14.8316 3.91863 15.5291 4.81108 15.7067L5.10371 14.2355ZM5.62503 15.7499C5.93758 15.7499 6.20331 15.7535 6.43892 15.7067L6.14628 14.2355C6.0921 14.2463 6.00946 14.2499 5.62503 14.2499V15.7499ZM6.75 13.125C6.75 13.509 6.74628 13.592 6.73548 13.6463L8.20666 13.939C8.25351 13.7034 8.25 13.438 8.25 13.125H6.75ZM6.43892 15.7067C7.33145 15.5291 8.02911 14.8315 8.20666 13.939L6.73548 13.6463C6.67631 13.9438 6.44383 14.1763 6.14629 14.2355L6.43892 15.7067Z"
                      fill="white"
                    />
                  </svg>
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden flex-col md:flex">
            <h1 className="text-left text-[28px] font-[800] leading-[35.78px] text-[#404040]">Teaching Script</h1>
            {script && script?.length > 0 && !headingLoading && (
              <button
                className="mt-2 flex max-w-[200px] flex-row items-center justify-around rounded-[15px] bg-[#66C7C9] px-3 py-2 text-[16px] font-[700] text-white"
                onClick={() => handleRegenerate()}
              >
                <IoIosRefresh size={24} />
                Regenerate Script
              </button>
            )}
            {headingLoading && (
              <div className="flex flex-row items-center gap-2">
                <h2 className="font-[700]">Generating Teaching Script, Please wait!</h2>
                <MoonLoader className="" size="25" color="#404040" />
              </div>
            )}
          </div>
          <div className="mx-auto mt-2 flex h-full flex-col items-start gap-2 md:mt-5">
            {documentData && documentData?.document_id && (
              <>
                <div className="grid w-full grid-cols-2 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-[1.5vw] xl:grid-cols-4 xl:gap-[2vw] 2xl:grid-cols-5">
                  {script?.map((each: any, index: number) => {
                    return (
                      <ScriptComponent
                        data={each}
                        key={index}
                        index={index}
                        setExpandedTs={setExpandedTs}
                        setActiveScript={setActiveScript}
                        setEachIndex={setEachIndex}
                      />
                    )
                  })}
                </div>

                {headingLoading && (activeHeading || nextHeading) && (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <MoonLoader className="" size="25" color="#404040" />

                    <h2 className="text-[16px] font-[500] text-[#80909C]">
                      Generating script for{" "}
                      <span className="font-[700] underline">
                        `{nextHeading ? nextHeading?.slice(0, 10) : activeHeading?.slice(0, 20)}...`
                      </span>
                    </h2>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
export default TeachingScript

const ScriptComponent = ({ data, index, setExpandedTs, setActiveScript, setEachIndex }: any) => {
  if (data?.heading) {
    return (
      <div className="relative md:pr-[25px] md:pt-[25px]">
        <div className="relative flex h-[210px] cursor-pointer  flex-col overflow-hidden rounded-[25px] bg-[#FFFFFF26] p-3 px-5 pb-5 shadow-md sm:h-[325px] sm:w-[234px] md:bg-white">
          <h1 className="mt-5 text-left text-[22px] font-[700] text-[#80909C] md:mt-10">
            {data?.heading?.slice(0, 18)}
          </h1>
          <p className="hidden pb-3 text-left text-[12px] font-[800] leading-[20px] text-[#80909C] md:block">
            {data?.script?.slice(0, 100)}
          </p>
          <p className="block pb-3 text-left text-[12px] font-[800] leading-[20px] text-[#80909C] md:hidden">
            {data?.script?.slice(0, 50)}
          </p>
          <button
            onClick={() => {
              setEachIndex(index)
              setActiveScript(data)
              setExpandedTs(true)
            }}
            className="absolute bottom-5 left-5 mt-1 z-10 w-[70%] rounded-[15px] bg-[#66C7C9] p-2 text-left text-[12px] font-[800] text-white sm:mt-3"
          >
            Read More ...
          </button>
          <Image className="absolute right-0 bottom-0 w-[90%] z-1 md:w-[80%]" src="/images/bubble.png" alt="img" height="100" width="100" />
        </div>
        <div className="absolute right-2 top-2 z-[100] hidden h-[50px] w-[50px] rounded-full bg-[#CEE5F2] md:block"></div>
      </div>
    )
  } else {
    return
  }
}
