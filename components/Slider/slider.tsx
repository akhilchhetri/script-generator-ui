import AwesomeSlider from "react-awesome-slider"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import "react-awesome-slider/dist/styles.css"

const WhereToSlider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1234 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }
  return (
    <div className="">
      <div className="block md:hidden">
        <Carousel
          responsive={responsive}
          className="mx-auto mb-10 w-[80%] bg-transparent"
          showDots={true}
          autoPlaySpeed={7000}
          autoPlay={true}
          dotListClass="custom-dot-list-style"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          infinite={true}
        >
          <div
            className="relative mx-auto flex h-[510px]  min-w-[342px] max-w-[400px] flex-col items-start justify-center rounded-[20px] px-10"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
              backdropFilter: "blur(42px)",
            }}
          >
            <span className="w-full text-center font-montHeavy text-[38px] text-[#66C7C9]">01</span>
            <h1 className="text-center font-montHeavy text-[43px] text-[#6E808E]">Talk to your PDF</h1>
            <span className="mx-auto w-[80%] text-center font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
              Imagine you can talk to any PDF, be it a research paper or notes from your teacher or just an article you
              want to ready. Teach Me will allow you to speak to the document and learn like learning one-to-one from an
              online teacher.
            </span>
            <div className="absolute bottom-3 mx-auto w-full text-center"></div>
          </div>
          <div
            className="relative mx-auto flex h-[510px]  min-w-[342px] max-w-[400px] flex-col items-start justify-center rounded-[20px] px-10"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
              backdropFilter: "blur(42px)",
            }}
          >
            <span className="w-full text-center font-montHeavy text-[38px] text-[#66C7C9]">02</span>
            <h1 className="text-center font-montHeavy text-[43px] text-[#6E808E]">Clear Doubts In Real-Time</h1>
            <span className="mx-auto w-[80%] text-center font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
              While learning anything we often have doubts. With Teach Me you can clarify doubts right on the screen and
              ask follow up questions or even request summaries.
            </span>
            <div className="absolute bottom-3 mx-auto w-full text-center"></div>
          </div>
          <div
            className="relative mx-auto flex h-[510px]  min-w-[342px] max-w-[400px] flex-col items-start justify-center rounded-[20px]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
              backdropFilter: "blur(42px)",
            }}
          >
            <span className="w-full text-center font-montHeavy text-[38px] text-[#66C7C9]">03</span>
            <h1 className="text-center font-montHeavy text-[43px] text-[#6E808E]">Work With an AI Teacher</h1>
            <span className="mx-auto w-[80%] text-center font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
              Be it clarifying doubts, or asking to rephrase concepts or practicing scenario based questions on what
              your are learning, Teach Me's AI teacher has you covered in real-time.
            </span>
            <div className="absolute bottom-3 mx-auto w-full text-center"></div>
          </div>
        </Carousel>
      </div>
      <div className="relative mx-auto mb-20 mt-10 hidden w-[80%] flex-row items-center justify-center md:flex">
        <div
          className="absolute left-20 top-[18px] z-10  mx-auto flex h-[576px] min-w-[342px] max-w-[400px] -rotate-3 cursor-pointer  flex-col items-start justify-center rounded-[20px] px-10 transition delay-300 duration-300 ease-in-out hover:z-20 hover:-rotate-6 hover:bg-[#6178C929]"
          style={{
            boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
            backdropFilter: "blur(16px)",
          }}
        >
          <span className="w-full text-center font-montHeavy text-[38px] text-[#66C7C9]">01</span>
          <h1 className="text-center font-montHeavy text-[43px] text-[#6E808E]">Talk to your PDF</h1>
          <span className="mx-auto w-[80%] text-center font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
            Imagine you can talk to any PDF, be it a research paper or notes from your teacher or just an article you
            want to ready. Teach Me will allow you to speak to the document and learn like learning one-to-one from an
            online teacher.
          </span>
          <div className="absolute bottom-3 mx-auto w-full text-center"></div>
        </div>
        <div
          className="relative z-[18] mx-auto flex h-[576px] min-w-[342px] max-w-[400px] cursor-pointer flex-col items-start justify-center rounded-[20px] px-10 transition delay-300 duration-300 ease-in-out hover:z-20 hover:scale-[1.05] hover:bg-[#6178C929]"
          style={{
            backgroundColor: "##6178C929",
            boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
            backdropFilter: "blur(16px)",
          }}
        >
          <span className="w-full text-center font-montHeavy text-[38px] text-[#66C7C9]">02</span>
          <h1 className="text-center font-montHeavy text-[43px] text-[#6E808E]">Clear Doubts In Real-Time</h1>
          <span className="mx-auto w-[80%] text-center font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
            While learning anything we often have doubts. With Teach Me you can clarify doubts right on the screen and
            ask follow up questions or even request summaries.
          </span>
          <div className="absolute bottom-3 mx-auto w-full text-center"></div>
        </div>
        <div
          className="absolute right-20 top-[18px] mx-auto flex h-[576px] min-w-[342px] max-w-[400px]  rotate-3 cursor-pointer flex-col items-start justify-center rounded-[20px] transition delay-300 duration-300 ease-in-out hover:z-20 hover:rotate-6 hover:bg-[#6178C929]"
          style={{
            backgroundColor: "##6178C929",
            boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
            backdropFilter: "blur(16px)",
          }}
        >
          <span className="w-full text-center font-montHeavy text-[38px] text-[#66C7C9]">03</span>
          <h1 className="text-center font-montHeavy text-[43px] text-[#6E808E]">Work With an AI Teacher</h1>
          <span className="mx-auto w-[80%] text-center font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
            Be it clarifying doubts, or asking to rephrase concepts or practicing scenario based questions on what your
            are learning, Teach Me's AI teacher has you covered in real-time.
          </span>
          <div className="absolute bottom-3 mx-auto w-full text-center"></div>
        </div>
      </div>
    </div>
  )
}

export const MobileTopSlider = () => {
  return (
    <>
      {/* <AwesomeSlider
        animation=""
        className="hidden border-none"
        style={{ width: "80%", margin: "auto", padding: "10px" }}
        bullets={false}
      >
        <div className="flex h-full w-full flex-col items-center  justify-center rounded-[20px] bg-[#66C7C9]">
          <h1 className="px-10 text-center font-montHeavy text-[21px] text-[#404040]">
            Upload your PDF file which contains the content to teach
          </h1>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[#C2EFF0]">
          <h1 className="px-10 text-center font-montHeavy text-[21px] text-[#404040]">
            Generate teaching content from PDF
          </h1>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[#66C7C9]">
          <h1 className="px-10 text-center font-montHeavy text-[21px] text-[#404040]">
            Teach me will generate syllabus to teach
          </h1>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[#C2EFF0]">
          <h1 className="px-10 text-center font-montHeavy text-[21px] text-[#404040]">
            Generate creative evaluation questions from PDF
          </h1>
        </div>
      </AwesomeSlider> */}
      <div className="flex flex-col items-start justify-start gap-0 w-[80%]">
        <div className="flex h-[70px] w-auto flex-col items-start  justify-center rounded-[20px] border-[2px] border-white bg-[#9DDEDF]">
          <h1 className="px-2 text-start font-montHeavy text-[12px] text-[#404040]">
            Upload your PDF file which contains the content to teach
          </h1>
        </div>
        <div
          className="flex h-[70px] w-auto flex-col items-center justify-center rounded-[20px]
border-[2px] border-white bg-[#C2EFF0]"
        >
          <h1 className="px-2 text-start font-montHeavy text-[12px] text-[#404040]">
            Generate teaching content from PDF
          </h1>
        </div>
        <div
          className="flex h-[70px] w-auto flex-col items-center justify-center rounded-[20px]
border-[2px] border-white bg-[#9DDFE0]"
        >
          <h1 className="px-2 text-start font-montHeavy text-[12px] text-[#404040]">
            Teach me will generate syllabus to teach
          </h1>
        </div>
        <div
          className="flex h-[70px] w-auto flex-col items-center justify-center rounded-[20px]
border-[2px] border-white bg-[#C2EFF0]"
        >
          <h1 className="px-2 text-start font-montHeavy text-[12px] text-[#404040]">
            Generate creative evaluation questions from PDF
          </h1>
        </div>
      </div>
    </>
  )
}
export default WhereToSlider
