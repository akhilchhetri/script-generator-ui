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
      <Carousel
        responsive={responsive}
        className="mx-auto mb-10 w-[80%]"
        showDots={true}
        autoPlaySpeed={7000}
        autoPlay={true}
        dotListClass="custom-dot-list-style"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        infinite={true}
      >
        <div
          className="relative mx-auto flex h-[344px]  min-w-[342px] max-w-[400px] flex-col items-start justify-center rounded-[20px] px-10"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
            backdropFilter: "blur(42px)",
          }}
        >
          <span className="mx-auto w-[80%] text-center font-montHeavy text-[21px] leading-[25px] text-[#404040]">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for
            previewing layouts and visual mockups.
          </span>
          <div className="absolute bottom-3 mx-auto w-full text-center"></div>
        </div>
        <div
          className="relative mx-auto flex h-[344px]  min-w-[342px] max-w-[400px] flex-col items-start justify-center rounded-[20px] px-10"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
            backdropFilter: "blur(42px)",
          }}
        >
          <span className="mx-auto w-[80%] text-center font-montHeavy text-[21px] leading-[25px] text-[#404040]">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for
            previewing layouts and visual mockups.
          </span>
          <div className="absolute bottom-3 mx-auto w-full text-center"></div>
        </div>
        <div
          className="relative mx-auto flex h-[344px]  min-w-[342px] max-w-[400px] flex-col items-start justify-center rounded-[20px]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
            backdropFilter: "blur(42px)",
          }}
        >
          <span className="mx-auto w-[80%] px-10 text-center font-montHeavy text-[21px] leading-[25px] text-[#404040]">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for
            previewing layouts and visual mockups.
          </span>
          <div className="absolute bottom-3 mx-auto w-full text-center"></div>
        </div>
      </Carousel>
    </div>
  )
}

export const MobileTopSlider = () => {
  return (
    <AwesomeSlider
      animation=""
      className="border-none"
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
    </AwesomeSlider>
  )
}
export default WhereToSlider
