import { useState } from "react"
const ExpandedEvaluation = ({ showChat, activeScript, setExpandedEv }: any) => {
  return (
    <div className={`${showChat ? "w-[63%]" : "w-full"} relative h-full`}>
      <div className={`expanded-script h-full overflow-y-hidden rounded-[20px] bg-white  px-4 shadow-lg`}>
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
          {/* {activeScript?.script} */}
          <QuestionComponent data={activeScript?.script} />
        </div>
      </div>
      <div
        className={`absolute bottom-[6px] flex h-[51px] w-[51px] cursor-pointer flex-row items-center justify-center rounded-full bg-[#66C7C9] ${
          showChat ? "right-[6px]" : "right-[7vw]"
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

const QuestionComponent = ({ data }: any) => {
  return (
    <div className="">
      {data?.map((each: any, index: any) => {
        return (
          <div key={index}>
            {each?.type === "SAQ" && <SAQComponent data={each} />}
            {each?.type === "MCQ" && <MCQComponent data={each} />}
          </div>
        )
      })}
    </div>
  )
}

const SAQComponent = ({ data }: any) => {
  const [hint, showHint] = useState(false)
  //   return <h1>Hello</h1>
  return (
    <div className="mb-1 mt-2 w-full">
      <div>
        <h1>Question</h1>
      </div>
      <div className="mt-2 rounded-[15px] bg-white p-3">
        <h1 className="text-[16px] font-[800] text-[#66C7C9]">{data?.question}</h1>

        <span className="font-500 text-[12px]">
          <span className="text-[#66C7C9]">Hint:&nbsp;</span>
          {data?.hint}
        </span>
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
          <div className="rounded-[20px] bg-[#E3ECF3] px-4 py-2 text-[12px] font-[800]">{data?.answer}</div>
        </div>
      </div>
    </div>
  )
}

const MCQComponent = ({ data }: any) => {
  return (
    <div className="mb-1 mt-2 w-full">
      <div>
        <h1>Question</h1>
      </div>
      <div className="mt-2 rounded-[15px] bg-white p-3">
        <h1 className="text-[16px] font-[800] leading-[28px] text-[#66C7C9]">{data?.question}</h1>
        {data?.option?.map((each: any, index: number) => {
          return (
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]" key={index}>
              <input
                className={`checked:bg-primary relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 font-[700] outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-[#66C7C9] checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-[#66C7C9] checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-[#66C7C9] checked:focus:after:bg-transparent`}
                type="checkbox"
                value=""
                id={`checkBoxId-${index}`}
              />
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
          <div className="rounded-[20px] bg-[#E3ECF3] px-4 py-2 text-[12px] font-[800]">{data?.answer}</div>
        </div>
      </div>
    </div>
  )
}
