import { useEffect, useState } from "react"
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io"
import { MoonLoader } from "react-spinners"
import { count } from "console"
import { useAppContext } from "app/context/AppContext"
import { generateScript } from "app/services/callapi"
import ExpandedScript from "./ExpandedScript"

const TeachingScript = () => {
  const { documentData, tableOfContent, documentId, expandedTs, setExpandedTs, activeScript, setActiveScript } =
    useAppContext()
  const teaching_script = JSON.parse(localStorage.getItem("teaching_script"))
  const [script, setScript] = useState(teaching_script?.length > 0 ? teaching_script : [])
  const [headingLoading, setHeadingLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const [activeHeading, setActiveHeading] = useState(
    tableOfContent?.length > 0 ? tableOfContent[0]?.heading : undefined
  )
  const [nextHeading, setNextHeading] = useState(tableOfContent?.length > 0 ? tableOfContent[0]?.heading : undefined)
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
      tableOfContent.map(async (each: any, index: any) => {
        setActiveHeading(each?.heading)
        let data = await callApi(each?.heading)
        setNextHeading(tableOfContent[index + 1]?.heading)
        let result = {
          heading: data?.heading_info?.heading,
          script: data?.script,
        }
        setScript((ps: any) => [...ps, result])
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

  const callApi = async (activeHeading: any) => {
    try {
      const data = {
        heading_name: activeHeading,
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
  console.log("this is", activeScript)
  return (
    <div className="flex h-full flex-col items-start px-3">
      {expandedTs && <ExpandedScript activeScript={activeScript} setExpandedTs={setExpandedTs} />}
      {!expandedTs && (
        <>
          <h1 className="text-left text-[28px] font-[800] leading-[35.78px] text-[#404040]">Teaching Script</h1>
          {script && script?.length > 0 && !headingLoading && (
            <button
              className="mt-2 rounded-[15px] bg-[#66C7C9] px-3 py-2 text-[16px] font-[700] text-white"
              onClick={() => handleRegenerate()}
            >
              Regenerate Script
            </button>
          )}
          {headingLoading && (
            <div className="flex flex-row items-center gap-2">
              <h2 className="font-[700]">Generating Teaching Script, Please wait!</h2>
              <MoonLoader className="" size="20" color="#66C7C9" />
            </div>
          )}
          <div className="mt-10 flex h-full flex-col items-start gap-2">
            {documentData && documentData?.document_id && (
              <>
                <div className="grid w-full grid-cols-4 items-start lg:grid-cols-4 lg:gap-[1.5vw] xl:grid-cols-4 xl:gap-[2vw] 2xl:grid-cols-5">
                  {script?.map((each, index) => {
                    return (
                      <ScriptComponent
                        data={each}
                        key={index}
                        setExpandedTs={setExpandedTs}
                        setActiveScript={setActiveScript}
                      />
                    )
                  })}
                </div>

                {headingLoading && (activeHeading || nextHeading) && (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <MoonLoader className="" size="20" color="#66C7C9" />
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

const ScriptComponent = ({ data, setExpandedTs, setActiveScript }: any) => {
  return (
    <div className="relative pr-[25px] pt-[25px]">
      <div className="relative flex h-[325px]  w-[234px] cursor-pointer flex-col overflow-hidden rounded-[25px] bg-white p-3 px-5 pb-5 shadow-md">
        <h1 className="mt-[45px] text-left text-[22px] font-[700] text-[#80909C]">{data?.heading?.slice(0, 18)}</h1>
        <p className="pb-3 text-left text-[12px] font-[800] leading-[20px] text-[#80909C]">
          {data?.script?.slice(0, 100)}
        </p>
        <button
          onClick={() => {
            setActiveScript(data)
            setExpandedTs(true)
          }}
          className="mt-3 text-left text-[12px] font-[800] text-[#66C7C9]"
        >
          Read More ...
        </button>
      </div>
      <div className="absolute right-2 top-2 z-[100] h-[50px] w-[50px] rounded-full bg-[#CEE5F2]"></div>
    </div>
  )
}
