import { useState } from "react"
import { TiTick } from "react-icons/ti"
import { toast } from "react-toastify"
import { useAppContext } from "app/context/AppContext"
import { updateScript } from "app/services/callapi"
const ExpandedScript = ({ documentId, showChat, activeScript, setExpandedTs }: any) => {
  const [showEdit, setShowEdit] = useState(false)
  const [script, setScript] = useState(activeScript?.script)
  const { setActiveScript, eachIndex } = useAppContext()
  let sc = JSON.parse(localStorage.getItem("teaching_script"))
  const [ts, setTs] = useState(sc || [])
  const handleUpdateData = async () => {
    toast.success("Updating script")
    setShowEdit((ps) => !ps)
    const payload = {
      script: script,
      document_id: documentId,
      heading: activeScript?.heading,
    }
    const result = await updateScript(payload)
    if (result?.success) {
      toast.success("Script updated successfully")
      const data = {
        heading: activeScript?.heading,
        script: result?.data?.script || activeScript,
      }
      setActiveScript(data)
      let d: { heading: any; script: any }[] = []
      ts.map(async (each: any, index: any) => {
        if (index === eachIndex) {
          let a = {
            heading: activeScript?.heading,
            script: result?.data?.script || activeScript,
          }
          d.push(a)
        }
        d.push(each)
      })
      setTs(d)
      localStorage.setItem("teaching_script", JSON.stringify(d))
    }
  }
  return (
    <div className={`relative h-full ${showChat ? "w-[63%]" : "w-full"}`}>
      <div className={`expanded-script h-full overflow-y-scroll rounded-[20px]  bg-white shadow-lg`}>
        <div className="flex w-full flex-row items-center justify-between py-3 pl-4">
          <h1 className="pl-3 text-left text-[24px] font-[800] leading-[30.67px] text-[#6E808E]">
            {activeScript?.heading?.slice(0, 100)}
          </h1>
          <div className="flex cursor-pointer flex-row items-center">
            <div
              className={`flex h-[30px] w-[30px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9] ${
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
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setExpandedTs((ps: any) => !ps)}
            >
              <path
                d="M13.125 18.9583L17.5 23.3333M17.5 23.3333L21.875 18.9583M17.5 23.3333V11.6667M30.625 17.5C30.625 10.2513 24.7487 4.375 17.5 4.375C10.2513 4.375 4.375 10.2513 4.375 17.5C4.375 24.7487 10.2513 30.625 17.5 30.625C24.7487 30.625 30.625 24.7487 30.625 17.5Z"
                stroke="#66C7C9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
