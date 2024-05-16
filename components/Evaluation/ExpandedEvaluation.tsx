import { useEffect, useState } from "react"
import { TiTick } from "react-icons/ti"
import { toast } from "react-toastify"
import {deleteQna, updateQna  } from "app/services/callapi"
import { MdDelete } from "react-icons/md"

const ExpandedEvaluation = ({ showChat, activeScript, setExpandedEv, setActiveScript, documentId }: any) => {
  let sc = JSON.parse(localStorage.getItem("eq"))
  const [script, setScript] = useState(sc || [])
  const deleteQuestion = async (data: any, scriptIndex: any) => {
    let scriptToUpdate = script
     const result = await deleteQna(data?.id)
     if (result?.success) {
    let temp = activeScript?.data
    temp?.map(async(each: any, index: number) => {
       if(each?.id===data?.id){
        let removed = await temp?.splice(index,1)
       }
     })
     await setActiveScript((ps)=>({...ps, data: [...temp]}))
     scriptToUpdate.map(async (eachScript: any, index: any) => {
       if (eachScript?.heading_id === activeScript?.heading_id) {
         scriptToUpdate[index] = activeScript
       }
     })
     localStorage.setItem("eq", JSON.stringify(scriptToUpdate))
     setScript(scriptToUpdate)
     toast.success("Question deleted")
     }else{
      toast.error("Error deleting question")
     }
   }
  
  return (
    <div className={`${showChat ? "w-[63%]" : "w-full"} relative h-full`}>
      <div className={`expanded-script h-full overflow-y-hidden rounded-[20px] bg-white px-4 shadow-lg`}>
        <div className="flex w-full flex-row items-center justify-between  py-3 pl-4">
          <h1 className="text-left text-[24px] font-[800] leading-[30.67px] text-[#6E808E]">
            {activeScript?.heading?.slice(0, 100)}
          </h1>
          <div className="cursor-pointer" onClick={() => setExpandedEv((ps: any) => !ps)}>
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div className="max-h-[77vh] w-full overflow-y-scroll rounded-[25px] bg-[#E3ECF3] px-5 py-3 pb-5 pt-4 text-left text-[16px] font-[800] leading-[28px] text-[#6E808E]">
          <QuestionComponent
            data={activeScript}
            heading_id={activeScript?.heading_id}
            activeScript={activeScript}
            setActiveScript={setActiveScript}
            heading={activeScript?.heading}
            documentId={documentId}
            script={script}
            setScript={setScript}
            deleteQuestion={deleteQuestion}
          />
        </div>
      </div>
      <div
        className={`absolute bottom-[6px] flex h-[51px] w-[51px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9] ${
          showChat ? "left-10" : "left-10"
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
            stroke="#FEFEFE"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default ExpandedEvaluation

const QuestionComponent = ({ data,heading_id,activeScript, setActiveScript, heading, documentId, script, setScript, deleteQuestion }: any) => {
  const [questionId, setQuestionId] = useState(undefined)
  const handleEvaluationScriptUpdate = async (payload: any, scriptIndex: any, question_id:any) => {
    let scriptToUpdate= script
    const result = await updateQna(payload, question_id)
    let temp = data?.data
    if (result?.success) {
      temp?.map((each: any, index: number) => {
        if (index === scriptIndex) {
          temp[index] = result?.data
        }
      })
      setActiveScript(data)
      scriptToUpdate.map(async (eachScript: any, index: any) => {
        if (eachScript?.heading_id === data?.heading_id) {
          scriptToUpdate[index] = data
        }
      })
      localStorage.setItem('eq', JSON.stringify(scriptToUpdate))
      setScript(scriptToUpdate)
      toast.success("Question updated")
    }
  }
 
  return (
    <div className="">
      {data?.data?.map((each: any, index: any) => {
        return (
          <div key={index}>
            {each?.type === "QNA" && (
              <SAQComponent
                data={each}
                scriptIndex={index}
                setQuestionId={setQuestionId}
                handleEvaluationScriptUpdate={handleEvaluationScriptUpdate}
                deleteQuestion={deleteQuestion}
              />
            )}
            {each?.type === "MCQ" && <MCQComponent data={each} scriptIndex={index} handleEvaluationScriptUpdate={handleEvaluationScriptUpdate} setQuestionId={setQuestionId} deleteQuestion={deleteQuestion}/>}
          </div>
        )
      })}
    </div>
  )
}

const SAQComponent = ({ data, scriptIndex, handleEvaluationScriptUpdate, deleteQuestion }: any) => {
  const [showEdit, setShowEdit] = useState(true)
  const [question, setQuestion] = useState(data?.question || undefined)
  const [qid, setQid]= useState(data?.id || undefined)
  const [hint, setHint] = useState(data?.hint || undefined)
  const [answer, setAnswer] = useState(data?.answer)

  const handleUpdateData = (data: any) => {
    setShowEdit(true)
    const payload = {
      question: question,
      hint: hint,
      answer: answer,
      type:"QNA",
      option: []
    }
    toast.success("Updating question.")
    handleEvaluationScriptUpdate(payload, scriptIndex, qid)
  }

  return (
    <div className="mb-1 mt-2 w-full">
      <div>
        <h1>
          Question <span className="text-[12px] font-[800] underline">QNA</span>
        </h1>
      </div>
      <div className="relative mt-2 rounded-[15px] bg-white p-3">
        <div className="float-right flex w-auto flex-row items-start gap-2 self-end">
          {showEdit && (
            <div
              className={`bottom-[6px] right-3 top-2 flex h-[35px] w-[35px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9]`}
              onClick={() => setShowEdit(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
                  stroke="#FEFEFE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}

          {!showEdit && (
            <div
              className={`bottom-[6px] right-3 top-2 flex h-[35px] w-[35px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9]`}
              onClick={() => handleUpdateData(data)}
            >
              <TiTick color="#E5FFFF" size={"26"} />
            </div>
          )}
          <div
            className={`bottom-[6px] right-3 top-2 flex h-[35px] w-[35px] cursor-pointer flex-row items-center justify-center rounded-full bg-red-500`}
            onClick={() => deleteQuestion(data, scriptIndex)}
          >
            <MdDelete color="white" />
          </div>
        </div>

        <div>
          {showEdit ? (
            <h1 className="text-[16px] font-[800] text-[#66C7C9]">{question}</h1>
          ) : (
            <input
              className="w-[70%]  rounded-[20px] border-2 border-[#66C7C9] px-2 text-[#66C7C9]"
              defaultValue={question}
              onChange={(e) => setQuestion(e?.target?.value)}
              placeholder="Enter question"
            />
          )}
        </div>
        {showEdit ? (
          <span className="font-500 text-[12px]">
            <span className="text-[#66C7C9]">Hint:&nbsp;</span>
            {hint}
          </span>
        ) : (
          <>
            <span className="text-[#66C7C9]">Hint: &nbsp;</span>
            <input
              className="mt-3 w-[70%] rounded-[20px] border-2 border-[#66C7C9] px-1 font-[400]"
              defaultValue={hint}
              onChange={(e) => setHint(e?.target?.value)}
              placeholder="Enter question"
            />
          </>
        )}

        <div className="mb-2 mt-3 flex flex-row items-center">
          <div className="w-[40px]">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13 11.5L18 16.5M18 16.5L13 21.5M18 16.5H10.1969C9.07899 16.5 8.5192 16.5 8.0918 16.2822C7.71547 16.0905 7.40973 15.7839 7.21799 15.4076C7 14.9798 7 14.4201 7 13.3V3.5"
                stroke="#66C7C9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {showEdit ? (
            <div className="rounded-[20px] bg-[#E3ECF3] px-4 py-2 text-[12px] font-[800]">{answer}</div>
          ) : (
            <input
              className="mt-3 w-[70%] rounded-[20px] border-2 border-[#66C7C9] px-1 font-[400]"
              defaultValue={answer}
              onChange={(e) => setAnswer(e?.target?.value)}
              placeholder="Enter question"
            />
          )}
        </div>
      </div>
    </div>
  )
}

const MCQComponent = ({ data, scriptIndex, handleEvaluationScriptUpdate, deleteQuestion }: any) => {
  const [showEdit, setShowEdit] = useState(true)
  const [question, setQuestion] = useState(data?.question || undefined)
  const [hint, setHint] = useState(data?.hint || undefined)
  const [qid, setQid] = useState(data?.id || undefined)
  const [answer, setAnswer] = useState(data?.answer)
  const [options, setOptions] = useState(data?.option || [])
  const handleUpdateData = (data: any) => {
    setShowEdit(true)
    const payload = {
      question: question,
      answer: answer,
      option:options,
      hint: hint,
      type: "MCQ"
    }
    handleEvaluationScriptUpdate(payload, scriptIndex, qid)
  }
  const handleChangeOptions= (data, index)=>{
    let changedOptions = options
    options.map((each, i)=>{
      if(index===i){
        changedOptions[i]= data
      }
    })
    setOptions(changedOptions)
  }
  
  return (
    <div className="mb-1 mt-2 w-full">
      <div>
        <h1>
          Question <span className="text-[12px] font-[800] underline">MCQ</span>
        </h1>
      </div>

      <div className="mt-2 rounded-[15px] bg-white p-3">
        {showEdit ? (
          // non edit mode
          <>
            <div className="flex flex-row items-start justify-between">
              <h1 className="text-[16px] font-[800] leading-[28px] text-[#66C7C9]">{question}</h1>
              <div className="flex-rows flex items-start justify-between gap-2">
                <div
                  className={`bottom-[6px] right-3 top-2 flex h-[35px] w-[35px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9]`}
                  onClick={() => setShowEdit(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
                      stroke="#FEFEFE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className={`bottom-[6px] right-3 top-2 flex h-[35px] w-[35px] cursor-pointer flex-row items-center justify-center rounded-full bg-red-500`}
                  onClick={() => deleteQuestion(data, scriptIndex)}
                >
                  <MdDelete color="white" />
                </div>
              </div>
            </div>

            {options?.map((each: any, index: number) => {
              return (
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]" key={index}>
                  <label
                    className="inline-block pl-[0.15rem] text-[14px] font-[800] hover:cursor-pointer"
                    htmlFor={`checkBoxId-${index}`}
                  >
                    {each}
                  </label>
                </div>
              )
            })}
            <div className="mb-2 mt-3 flex flex-row items-center">
              <div className="w-[40px]">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 11.5L18 16.5M18 16.5L13 21.5M18 16.5H10.1969C9.07899 16.5 8.5192 16.5 8.0918 16.2822C7.71547 16.0905 7.40973 15.7839 7.21799 15.4076C7 14.9798 7 14.4201 7 13.3V3.5"
                    stroke="#66C7C9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="rounded-[20px] bg-[#E3ECF3] px-4 py-2 text-[12px] font-[800]">{answer}</div>
            </div>
          </>
        ) : (
          // edit mode
          <>
            <div className="flex flex-row items-start justify-between">
              <input
                className="w-[70%]  rounded-[20px] border-2 border-[#66C7C9] px-2 text-[#66C7C9]"
                defaultValue={question}
                onChange={(e) => setQuestion(e?.target?.value)}
                placeholder="Enter question"
              />
              <div className="flex-rows flex items-start justify-between gap-2">
                <div
                  className={`bottom-[6px] right-3 top-2 flex h-[35px] w-[35px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9]`}
                  onClick={() => handleUpdateData(data)}
                >
                  <TiTick color="#E5FFFF" size={"26"} />
                </div>
                <div className="bottom-[6px] right-3 top-2 flex h-[35px] w-[35px] cursor-pointer flex-row items-center justify-center rounded-full bg-red-500" onClick={()=>deleteQuestion(data, scriptIndex)}>
                  <MdDelete color="white" />
                </div>
              </div>
            </div>

            {options?.map((each: any, index: number) => {
              return (
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]" key={index}>
                  {/* <label
                    className="inline-block pl-[0.15rem] text-[14px] font-[800] hover:cursor-pointer"
                    htmlFor={`checkBoxId-${index}`}
                  >
                    {each}
                  </label> */}
                  <input
                    className="w-[70%]  rounded-[20px] border-2 border-[#66C7C9] px-2 text-[#66C7C9]"
                    defaultValue={each}
                    onChange={(e) => handleChangeOptions(e?.target?.value, index)}
                    placeholder="Enter question"
                  />
                </div>
              )
            })}
            <div className="mb-2 mt-3 flex flex-row items-center">
              <div className="w-[40px]">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 11.5L18 16.5M18 16.5L13 21.5M18 16.5H10.1969C9.07899 16.5 8.5192 16.5 8.0918 16.2822C7.71547 16.0905 7.40973 15.7839 7.21799 15.4076C7 14.9798 7 14.4201 7 13.3V3.5"
                    stroke="#66C7C9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <input
                className="mt-3 w-[70%] rounded-[20px] border-2 border-[#66C7C9] px-1 font-[400]"
                defaultValue={answer}
                onChange={(e) => setAnswer(e?.target?.value)}
                placeholder="Enter question"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
