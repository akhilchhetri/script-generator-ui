import React, { useCallback,useEffect, useRef, useState } from "react"
import { TiTick } from "react-icons/ti"
import { toast } from "react-toastify"
import { useAppContext } from "app/context/AppContext"
import { updateScript } from "app/services/callapi"
import { MdClose, MdDownload } from "react-icons/md"
import { FaFileDownload } from "react-icons/fa"
import ReactToPrint from "react-to-print"


const ExpandedScript = ({ documentId, showChat, activeScript, setExpandedTs }: any) => {
  const [showEdit, setShowEdit] = useState(false)
  // ref
  const componentRef = useRef(null)
  const onBeforeGetContentResolve = React.useRef(null)

  // new
  const [loading, setLoading] = React.useState(false)
  const [text, setText] = React.useState("old boring text")
  

  const [script, setScript] = useState(activeScript?.script)
  const { setActiveScript, eachIndex } = useAppContext()
  let sc = JSON.parse(localStorage.getItem("teaching_script"))
  const [ts, setTs] = useState(sc || [])
  const handleUpdateData = async () => {
    toast.success("Updating script")
    setShowEdit((ps) => !ps)
    const payload = {
      script: script,
    }
    const result = await updateScript(payload, activeScript?.id)
    if (result?.success) {
      toast.success("Script updated successfully")
      const data = {heading: activeScript?.heading, id: activeScript?.id, script: script}
      setActiveScript(data)
      // let d: { heading: any; script: any }[] = []
      ts.map(async (each: any, index: any) => {
        if (index === eachIndex) {
          ts[index]= data
        }
      })
      setTs(ts)
      localStorage.setItem("teaching_script", JSON.stringify(ts))
    }else{
      toast.error("Error occured, Try again.")
    }
  }
    const ReactToPrintTrigger = React.useCallback(() => {
      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
      // to the root node of the returned component as it will be overwritten.

      // Bad: the `onClick` here will be overwritten by `react-to-print`
      // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

      // Good
      return (
        <button className="absolute top-[-10px] flex flex-row items-center gap-2 rounded-sm bg-[#6E808E] px-2 text-[#66C7C9]">
          <FaFileDownload color="#66C7C9" size="12" />
          Download as PDF
        </button>
      ) // eslint-disable-line max-len
    }, [])

  const reactToPrintContent = useCallback(() => {
    return componentRef.current
  }, [componentRef.current])
  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called")
  }, [])
  const handleOnBeforeGetContent = useCallback(() => {
    console.log("`onBeforeGetContent` called")
    // setLoading(true)
    toast.success("Generating PDF, Please wait..")
    // setText("Loading new text...")

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve
      setTimeout(() => {
        setLoading(false)
        setText("")
        resolve()
      }, 2000)
    })
  }, [setLoading, setText])
  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called")
  }, [])
  useEffect(() => {
    if (text === "New, Updated Text!" && typeof onBeforeGetContentResolve.current === "function") {
      onBeforeGetContentResolve.current()
    }
  }, [onBeforeGetContentResolve.current, text])

  return (
    <div className={`relative h-full ${showChat ? "w-[63%]" : "w-full"}`}>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle={activeScript?.heading || "This is title"}
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={ReactToPrintTrigger}
      />
      <div ref={componentRef} className={`expanded-script h-full overflow-y-scroll rounded-[20px]  bg-white shadow-lg`}>
        <div className="flex w-full flex-row items-center justify-between py-3 pl-4">
          <h1 className="pl-3 text-left text-[24px] font-[800] leading-[30.67px] text-[#6E808E]">
            {activeScript?.heading?.slice(0, 100)}
          </h1>
          <div className="flex cursor-pointer flex-row items-center gap-[4px] mr-5">
            <div
              className={`flex h-[29px] w-[29px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9] ${
                showChat ? "right-[6px]" : "right-[7vw]"
              }`}
            >
              {!showEdit ? (
                <button onClick={(ps) => setShowEdit(true)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
                      stroke="#FEFEFE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <div
                  className={`flex h-[30px] w-[30px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9]`}
                  onClick={() => handleUpdateData()}
                >
                  <TiTick color="#E5FFFF" size={"22"} />
                </div>
              )}
            </div>
            <div
              className="cursor-pointer rounded-full border-2 border-[#66C7C9] p-[6px]"
              onClick={() => setExpandedTs((ps: any) => !ps)}
            >
              <MdClose color="#66C7C9" size="12" fontWeight={800} />
            </div>
            {/* <div
              className="mr-4 cursor-pointer rounded-full border-2 border-[#66C7C9] p-[6px]"
              onClick={() => handleDownload()}
            >
              <FaFileDownload color="#66C7C9" size="12" />
            </div> */}
          </div>
        </div>
        <div className="px-4 pb-4">
          {!showEdit ? (
            <div className="mt-2 h-full w-full rounded-[20px] bg-[#E3ECF3] px-4 py-3 pb-6 pt-4 text-left text-[16px] font-[800] leading-[28px] text-[#6E808E]">
              {script}
            </div>
          ) : (
            <div className="h-full w-full rounded-[20px] bg-[#EDF0F3]">
              <textarea
                defaultValue={script}
                placeholder="Add your text here"
                rows={20}
                className="min-h-full w-full rounded-[20px] bg-transparent p-2 text-[20px] opacity-50 outline-none"
                onChange={(e) => setScript(e?.target?.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExpandedScript
