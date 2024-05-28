import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppContext } from "app/context/AppContext"
import Link from "next/link"
import { baseUrl } from "app/services/callapi"
import WhereToSlider, { MobileTopSlider } from "components/Slider/slider"

const Dashboard = () => {
  const { setDocumentData, setDocumentId, setFile, documentId } = useAppContext()
  const [selectedFile, setSelectedFile] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedFile) {
      setLoading(true)
      handleFormSubmit(selectedFile)
    }
  }, [selectedFile])
  const handleFileChange = async (e: any) => {
    setSelectedFile(undefined)
    setSelectedFile(e?.target.files[0])
  }

  const handleFormSubmit = async (selectedFile: any) => {
    const formData = new FormData()
    formData.append("files", selectedFile)
    toast.success("Uploading file")
    try {
      const response = await axios.post(`${baseUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (response?.status === 200) {
        let data = response?.data
        if (data?.success) {
          setDocumentId(data?.data?.document_id)
          toast.success("Syllabus generated successfully")
          localStorage.setItem("documentId", data?.data?.document_id)
          setDocumentData(data?.data)
          localStorage.setItem("documentData", JSON.stringify(data?.data))
          localStorage.setItem("file_name", selectedFile?.name)
          setFile(selectedFile?.name)
        } else {
          toast.error("Something went wrong, Please try again.")
        }
      }

      if (response) {
        // Handle success
        setLoading(false)
      } else {
        console.error("File upload failed")
        // Handle error
      }
    } catch (error) {
      toast.error("Error uploading PDF, Try again.")
      setLoading(false)
    }
  }
  if (!documentId) {
    return (
      <div className="mx-auto min-h-[100vh] w-[100vw] overflow-x-hidden">
        <div
          id="topLandingChat"
          className="relative flex max-h-[100vh] min-h-[95vh] w-full flex-col items-center justify-between bg-[#BEEAEE] md:flex-row"
        >
          <div className="absolute top-0 z-[2] h-[40%] w-[100vw]">
            <Image src="/images/bgtop.png" alt="img" height="100" width="100" className="h-full w-full object-fill" />
          </div>
          <div
            className="absolute bottom-0 z-[5] h-[85%] w-[100vw]"
            style={{
              backgroundImage: `url('/images/bg1.svg')`,
              backgroundPosition: "bottom",
              backgroundColor: "transparent",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          ></div>

          <section className="relative z-10 flex min-h-[100vh] w-full flex-col bg-transparent">
            <div className="relative flex flex-row">
              <Image
                src="/images/oi.png"
                height={"100"}
                width={"100"}
                alt="image"
                className="mx-5 w-[20%] cursor-pointer p-5 md:w-[10%]"
              />
              <div className="absolute top-10 flex w-full flex-col">
                <h1 className="text-center font-montHeavy text-[38px] leading-none text-[#404040] md:text-[62px]">
                  Teach Me <br />
                  By{" "}
                  <span className="bg-gradient-to-r from-[#66C8C9] to-[#ACCEF4] bg-clip-text text-transparent">
                    OIAI
                  </span>
                </h1>
                <p className="mt-5 hidden w-full text-center font-montLight text-[22px] leading-normal text-[#404040] md:w-[50%]">
                  Upload any PDF and let our AI teach you.
                </p>
              </div>
            </div>

            <div className="xlg:m-0 mt-20 min-h-[70vh] w-full flex-col items-center justify-start">
              <div className="relative h-[60vh] w-full">
                <Image
                  src={"/images/chatbot.png"}
                  width={"900"}
                  height={"900"}
                  className="z-[40] mx-auto w-[50%] md:block lg:w-[35%] hidden"
                  alt="chatbot"
                />
                <div className="z-1 hidden md:flex absolute top-5 h-full w-[100%] flex-row items-center justify-around bg-transparent">
                  <div className="z-1 relative flex h-full w-[30%] flex-col items-center justify-start gap-20">
                    <div
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.16)", backdropFilter: "blur(30px)" }}
                      className="flex h-[210px] w-[70%] flex-row items-center justify-center rounded-[20px] border-4 border-[#C2EFF0] bg-transparent px-10"
                    >
                      <h2 className="text-center font-montHeavy text-[18px] text-[#6E808E]">
                        Teach Me will generate the syllabus to teach
                      </h2>
                    </div>
                    <Image
                      alt="line"
                      src="/images/line7.png"
                      height={100}
                      width={100}
                      className="absolute right-[-80px] top-20 w-[200px] rotate-45"
                    />
                    <div
                      style={{ backdropFilter: "blur(5px)" }}
                      className="relative flex h-[210px] w-[70%] flex-row items-center justify-center rounded-[20px] border-4 border-[#C2EFF0] bg-[#66C7C98C] px-10"
                    >
                      <h2 className="text-center font-montHeavy text-[18px] text-[#6E808E]">
                        Upload your PDF file which contains the content to teach
                      </h2>
                    </div>
                    <Image
                      alt="line"
                      src="/images/line7.png"
                      height={100}
                      width={100}
                      className="z-2 absolute bottom-[120px] w-[200px]"
                      style={{ transform: "rotate(-45deg)", bottom: "200px", right: "-80px", zIndex: "2" }}
                    />
                  </div>
                  <div className="relative flex h-full w-[30%] flex-col items-center justify-start gap-20">
                    <div
                      style={{ backdropFilter: "blur(30px)" }}
                      className="flex h-[210px] w-[70%] flex-row items-center justify-center rounded-[20px] border-4 border-[#C2EFF0] bg-[#66C7C98C] px-10"
                    >
                      <h2 className="text-center font-montHeavy text-[18px] text-[#6E808E]">
                        Generate creative evaluation questions from PDF
                      </h2>
                    </div>
                    <Image
                      alt="line"
                      src="/images/line7.png"
                      height={100}
                      width={100}
                      style={{ transform: "rotate(-210deg)", left: "-100px" }}
                      className="absolute left-0 top-20 w-[200px] rotate-[45]"
                    />

                    <div
                      style={{ backgroundColor: "#FFFFFF5C", backdropFilter: "blur(10px)" }}
                      className="flex h-[210px] w-[70%] flex-row items-center justify-center rounded-[20px] border-4 border-[#C2EFF0] px-10"
                    >
                      <h2 className="text-center font-montHeavy text-[18px] text-[#6E808E]">
                        <h2 className="text-center font-montHeavy text-[18px] text-[#6E808E]">
                          Generate teaching content from PDF
                        </h2>
                      </h2>
                    </div>
                    <Image
                      alt="line"
                      src="/images/line7.png"
                      height={100}
                      width={100}
                      style={{ transform: "rotate(-145deg)", width:'200px', left: "-100px", bottom:'200px', position:'absolute' }}
                    />
                  </div>
                </div>
                {/* Mobile */}
                <MobileTopSection/>
                <div className="absolute bottom-[-12vh] md:bottom-[-25vh] mx-auto h-auto w-full">
                  <div className="mx-auto flex h-[30vh] w-[80%] flex-col items-center gap-2 rounded-[20px] bg-[#66C7C9] p-2 md:w-[50%]">
                    <div className="h-full w-full rounded-[20px] bg-white p-2">
                      <div className="h-full w-full rounded-[20px] border-2 border-dashed border-[#66C7C9] bg-[#EDF0F3]">
                        <label
                          htmlFor="dropzone-file"
                          className="dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center"
                        >
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                              width="30"
                              height="20"
                              viewBox="0 0 30 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 15V7.5M15 7.5L11.25 10M15 7.5L18.75 10M28.75 13.75C28.75 10.9886 26.5114 8.75 23.75 8.75C23.7204 8.75 23.6915 8.75026 23.6621 8.75077C23.0559 4.51003 19.4084 1.25 15 1.25C11.5042 1.25 8.48774 3.30005 7.08618 6.26352C3.82758 6.47681 1.25 9.18727 1.25 12.4998C1.25 15.9516 4.04822 18.7501 7.5 18.7501L23.75 18.75C26.5114 18.75 28.75 16.5114 28.75 13.75Z"
                                stroke="#66C7C9"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <div className="my-2 text-center text-[12px] text-[#404040]">
                              <h2>Drag and drop your file here to upload</h2>
                              <h2>or</h2>
                            </div>
                            <div>
                              <label className="flex w-auto cursor-pointer flex-row items-center justify-center gap-1 rounded-lg border bg-[#66C7C9] p-2 tracking-wide">
                                <span className="text-[14px] font-[800] leading-normal text-white">
                                  Upload PDF File
                                </span>
                                <input type="file" className="hidden" onChange={handleFileChange} />
                              </label>
                            </div>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative z-10 mx-auto hidden min-h-[75vh] w-[90%] flex-row items-center justify-center md:w-[45%] ">
            <div className="absolute flex h-full w-[85%] flex-col items-center gap-2 rounded-[20px] bg-[#66C7C9] p-2">
              <div className="h-[60%] w-full rounded-[20px] bg-white p-2">
                <div className="h-full w-full rounded-[20px] bg-[#EDF0F3]">
                  <textarea
                    placeholder="Add your text here"
                    disabled
                    className="h-full w-full rounded-[20px] bg-transparent p-2 text-[20px] text-[#66C7C9] outline-none"
                  />
                </div>
              </div>
              <div className="h-[40%] w-full rounded-[20px] bg-white p-2">
                <div className="h-full w-full rounded-[20px] border-2 border-dashed border-[#66C7C9] bg-[#EDF0F3]">
                  <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15 15V7.5M15 7.5L11.25 10M15 7.5L18.75 10M28.75 13.75C28.75 10.9886 26.5114 8.75 23.75 8.75C23.7204 8.75 23.6915 8.75026 23.6621 8.75077C23.0559 4.51003 19.4084 1.25 15 1.25C11.5042 1.25 8.48774 3.30005 7.08618 6.26352C3.82758 6.47681 1.25 9.18727 1.25 12.4998C1.25 15.9516 4.04822 18.7501 7.5 18.7501L23.75 18.75C26.5114 18.75 28.75 16.5114 28.75 13.75Z"
                          stroke="#66C7C9"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="my-2 text-center text-[12px] text-[#404040]">
                        <h2>Drag and drop your file here to upload</h2>
                        <h2>or</h2>
                      </div>
                      <div>
                        <label className="flex w-auto cursor-pointer flex-row items-center justify-center gap-1 rounded-lg border bg-[#66C7C9] p-2 tracking-wide">
                          <span className="text-[14px] font-[800] leading-normal text-white">Upload PDF File</span>
                          <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* below */}
        <BelowHeroSection />
      </div>
    )
  } else {
    return null
  }
}
export default Dashboard
// <div className="h-[100vh] w-[100vw] bg-red-500 bg-gradient-to-r from-teal-300 to-white to-70% md:w-[20vw] lg:w-[15vw]">

const MobileTopSection =()=>{
  return (
    <div className="flex flex-col items-center justify-around md:hidden">
      <MobileTopSlider />
      <div className="hidden h-[10vh] w-full items-start justify-around px-5">
        <div className="float-left flex h-[50%] w-[70%] flex-col items-center justify-center rounded-[15px] border-[1px] border-white bg-[#66C7C9]">
          <h1 className="px-4 text-center text-[12px] font-[500] text-[#404040]">
            1. Upload your PDF file which contains the content to teach
          </h1>
        </div>
        <div className="float-right mb-5 flex h-[50%] w-[70%] flex-col items-center justify-center rounded-[15px] border-[1px] border-white bg-[#C2EFF0]">
          <h1 className="px-4 text-center text-[12px] font-[500] text-[#404040]">
            2. Generate teaching content from PDF
          </h1>
        </div>
      </div>
      <div className="mt-10 hidden h-[10vh] w-full items-start justify-around px-5">
        <div className="float-left flex h-[50%] w-[70%] flex-col items-center justify-center rounded-[15px] border-[1px] border-white bg-[#66C7C9]">
          <h1 className="px-4 text-center text-[12px] font-[500] text-[#404040]">
            3. Teach me will generate syllabus to teach
          </h1>
        </div>
        <div className="float-right mb-5 flex h-[50%] w-[70%] flex-col items-center justify-center rounded-[15px] border-[1px] border-white bg-[#C2EFF0]">
          <h1 className="px-4 text-center text-[12px] font-[500] text-[#404040]">
            4. Generate creative evaluation questions from PDF
          </h1>
        </div>
      </div>
    </div>
  )
}
const BelowHeroSection = () => {
  return (
    <div className="relative bg-[#BEEAEE]">
      <div className="relative z-[5] flex min-h-[980px] w-full flex-row items-center justify-center   to-100%">
        <Player />
      </div>

      <div
        className="relative top-[-17vh] z-[4] flex min-h-[1000px] w-[100vw] flex-col items-center justify-center pt-10"
        style={{
          backgroundImage: `url('/images/bg1.svg')`,
          backgroundPosition: "bottom",
          backgroundColor: "#BEEAEE",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <div className="relative z-[5]">
          <FeatureCard1 />
        </div>
        <Image
          src="/images/shape3.svg"
          className="absolute top-[50%] z-[1] w-full"
          alt="image"
          height={100}
          width={100}
        />
        <div className="relative z-[2] mt-10 flex flex-col pt-20">
          <h1 className="mt-5 text-center font-montHeavy text-[42px] leading-[60px] text-[#404040] md:text-[62px]">
            How &nbsp;
            <span className="bg-gradient-to-r from-[#66C8C9] to-[#ACCEF4] bg-clip-text text-transparent">Teach Me</span>
            <br /> Works?
          </h1>
        </div>
      </div>
      {/* how teach me works */}
      <div
        className="relative z-[2] mt-[-10vh] flex h-auto min-h-[700px] w-[100vw] flex-col items-center justify-center "
        style={{
          backgroundImage: `url('/images/bg1.svg')`,
          backgroundPosition: "center",
          backgroundColor: "transparent",
          backgroundRepeat: "repeat",
          backgroundSize: "70%",
        }}
      >
        <div className="flex min-h-[600px] w-full flex-row items-center justify-around pb-[20vh] md:pb-0 md:pt-[20vh]">
          <div className="relative hidden h-full  w-[50%] md:block">
            <div
              className="relative z-[9] min-h-[700px] md:max-w-[80%]"
              style={{
                backgroundImage: `url('/images/chatdemo.png')`,
                backgroundPosition: "center",
                backgroundColor: "transparent",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div>
            <div className="absolute bottom-[10%] right-[30%] z-[8] w-[40%] bg-transparent md:bottom-0 md:right-0 md:w-[60%]">
              <Image
                src="/images/chatbot3.png"
                alt="image"
                width={100}
                height={100}
                className="h-full w-full bg-transparent"
              />
            </div>
          </div>
          <div className="flex min-h-[663px] w-[70%] flex-col items-center justify-center self-start py-10 md:w-[50%]">
            <TeachMeText />
          </div>
        </div>
        <div className="relative mt-[-12vh] min-h-[60vh] w-full md:h-auto">
          <Image
            src="/images/shape3.svg"
            className="relative top-[40%] z-[1] min-h-[60vh] w-full"
            alt="image"
            height={100}
            width={100}
          />
          <div className="absolute top-0 z-[5] h-full min-h-[100%] w-full bg-transparent">
            <AiTeach />
          </div>
        </div>
        {/* testimonials */}
        <div
          className="relative z-[2] flex h-auto min-h-[500px] w-[100vw] flex-col items-center justify-center "
          style={{
            backgroundImage: `url('/images/bg1.svg')`,
            backgroundPosition: "center",
            backgroundColor: "transparent",
            backgroundRepeat: "repeat",
            backgroundSize: "70%",
          }}
        >
          <Testimonials />
        </div>
        <div
          className="relative z-[1] min-h-[70vh] w-full md:pt-0 pt-20"
          style={
            {
              // backgroundImage: `url('/images/shape3.svg')`,
              // backgroundPosition: "center",
              // backgroundColor: "transparent",
              // backgroundRepeat: "no-repeat",
              // backgroundSize: "100%",
            }
          }
        >
          <WhereTeachMeSection />
        </div>
        <div className="relative flex flex-col items-center w-full">
          <Footer />
        </div>
      </div>
    </div>
  )
}
const VideoPlayer = () => {
  return (
    <div className="relative z-[6] flex min-h-[540px] md:min-h-[720px] w-[80%] flex-row items-center justify-center">
      <div className="absolute z-[6] mx-auto mt-10 flex h-full w-full  flex-row items-center justify-center rounded-[20px] bg-[#000000]">
        <div className="h-auto w-auto cursor-pointer rounded-lg p-3">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.75 65.0012V25.0012C18.75 21.7028 18.75 20.0518 19.4441 19.0759C20.0499 18.2241 20.9836 17.6649 22.0203 17.5312C23.2076 17.3781 24.6638 18.1547 27.572 19.7058L65.072 39.7058L65.0856 39.7118C68.2996 41.4259 69.9073 42.2834 70.4347 43.4262C70.8948 44.4232 70.8948 45.574 70.4347 46.571C69.9066 47.7155 68.2951 48.5764 65.072 50.2954L27.572 70.2954C24.6617 71.8476 23.208 72.6212 22.0203 72.468C20.9836 72.3343 20.0499 71.7752 19.4441 70.9234C18.75 69.9475 18.75 68.2996 18.75 65.0012Z"
              stroke="#66C7C9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="bg-red-[500] absolute right-[-15px] top-[-35px] z-[5]">
        <Image src="/images/chatbot2.png" alt="img" height="100" width="100" />
      </div>
    </div>
  )
}

const FeatureCard1 = () => {
  const scrollToTop = () => {
    const divRef = document.getElementById("topLandingChat")
    if (divRef) {
      divRef.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative mt-[140px] w-full">
      <div
        className="relative mx-auto flex h-[800px] w-[80%] flex-col items-center justify-center gap-7 rounded-[20px] px-[5vw]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.16)",
          backdropFilter: "blur(30px)",
          boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
        }}
      >
        <h2 className="w-full md:w-[60%] text-center font-[montHeavy] text-[32px] md:text-[58px] capitalize leading-[65px] text-[#374957]">
          Build by educationalists, not just techies.
        </h2>
        <span className="font-montHeavy text-center text-[18px] md:text-[24px] capitalize text-[#80909C]">
          Teach Me is built by Otermans Institute (OI) renowned for upskilling learners with less means across 4
          continents and using AI to provide teachers for anyone with a smart device. The founders of OI have taught in
          the United Kingdom and also learners of 9+ countries before using technology to support learners globally. So
          when we say we know education, we do!
        </span>
        <button
          className="font-montHeavy rounded-[10px] bg-[#66C7C9] px-8 py-4 text-[16px] capitalize leading-normal text-white"
          onClick={() => scrollToTop()}
        >
          Try it now
        </button>
      </div>
    </div>
  )
}

const Player = () => {
  return (
    <>
      <div className="absolute top-0 md:h-[594px] w-full">
        <div className="absolute left-[-65.1%] top-3 h-[594px] w-[100vw] pt-10">
          <Image
            src="/images/bg2.svg"
            alt="img"
            height="100"
            width="100"
            className="object-fit mx-auto w-full bg-transparent"
          />
        </div>
        <div className="absolute right-0 top-2h-[594px] w-[100vw] pt-10">
          <Image
            src="/images/bg2.svg"
            alt="img"
            height="100"
            width="100"
            className="object-fit mx-auto w-full bg-transparent"
          />
        </div>
      </div>
      <div className="absolute bottom-2 h-[594px] w-full overflow-hidden ">
        <div className="absolute bottom-2 left-[-6%] z-[2] w-[80%]">
          <Image
            src="/images/bg3.svg"
            alt="img"
            height="100"
            width="100"
            className="object-fit mx-auto h-[594px] w-full"
          />
        </div>
        <div className="absolute bottom-2 left-[15.5%] z-[2] h-[594px] w-[100vw]">
          <Image
            src="/images/bg4.svg"
            alt="img"
            height="100"
            width="100"
            className="object-fit mx-auto h-[594px] w-full"
          />
        </div>
      </div>
      <VideoPlayer />
      <div
        className="absolute h-[400px] w-full "
        style={{
          backgroundImage: `url('/images/shape2.svg')`,
          backgroundPosition: "bottom",
          backgroundColor: "transparent",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <Image src="/images/shape1.svg" alt="image" height="100" width="100" className="h-full w-full" />
      </div>
    </>
  )
}

const TeachMeText = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-[30px]">
      <div className="my-2 flex flex-row items-start justify-start gap-4">
        <h1 className="font-montHeavy text-[38px] capitalize leading-none text-[#66C7C9]">01</h1>
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-montHeavy text-[38px] capitalize leading-none text-[#6E808E] md:text-[58px]">
            Talk to your pdf
          </h1>
          <span className="mt-3 pl-2 font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
            Imagine you can talk to any PDF, be it a research paper or notes from your teacher or just an article you
            want to ready. Teach Me will allow you to speak to the document and learn like learning one-to-one from an
            online teacher.
          </span>
        </div>
      </div>
      <div className="my-2 flex flex-row items-start justify-start gap-4">
        <h1 className="font-montHeavy text-[38px] capitalize leading-none text-[#66C7C9]">02</h1>
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-montHeavy text-[38px] capitalize leading-none text-[#6E808E] md:text-[58px]">
            Clear doubts In Real-Time
          </h1>
          <span className="mt-3 pl-2 font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
            While learning anything we often have doubts. With Teach Me you can clarify doubts right on the screen and
            ask follow up questions or even request summaries.
          </span>
        </div>
      </div>
      <div className="my-2 flex flex-row items-start justify-start gap-4">
        <h1 className="font-montHeavy text-[38px] capitalize leading-none text-[#66C7C9]">03</h1>
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-montHeavy text-[38px] md:text-[58px] capitalize leading-none text-[#6E808E]">
            Work With An AI Teacher
          </h1>
          <span className="mt-3 pl-2 font-montHeavy text-[14px] leading-[20px] text-[#6E808E]">
            Be it clarifying doubts, or asking to rephrase concepts or practicing scenario based questions on what your
            are learning, Teach Me&apos;s AI teacher has you covered in real-time.
          </span>
        </div>
      </div>
    </div>
  )
}

const AiTeach = () => {
  return (
    <div className="flex h-full w-full flex-col md:flex-row items-center justify-start md:justify-around ">
      <div className="flex w-[80%] md:w-[30%] flex-row flex-wrap items-center justify-center">
        <h1 className="font-montHeavy text-center text-[62px] capitalize leading-[60px] text-[#404040]">
          Can <span className="text-[#66C7C9]">AI</span> teach The world
        </h1>
        <span className="font-montHeavy my-5 text-[18px] md:text-[24px] leading-[25px] text-[#6E808E]">
          OIAI is committed democratise learning using AI technology and by giving to everyone a{" "}
          <Link as="url" href="https://www.youtube.com/watch?v=0eQ_rcOG0HU&t=664s">
            <span className="text-blue-300 underline">virtual teacher</span>
          </Link>{" "}
          in their pocket.
        </span>
      </div>
      <div className="flex min-w-[30%] flex-col items-center justify-center">
        <div className="grid grid-cols-3 md:grid-cols-3 justify-items-end gap-2 md:gap-4">
          <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-[10px] bg-[#C2EFF0] text-center">
            <h1 className="font-montHeavy text-[38px] capitalize leading-[50px] text-[#66C7C9]">0 K</h1>
            <span className="font-montHeavy text-[14px] leading-[20px] text-[#6e808e]">Learners</span>
          </div>
          <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-[10px] bg-[#C2EFF0] text-center">
            <h1 className="font-montHeavy text-[38px] capitalize leading-[50px] text-[#66C7C9]">10 +</h1>
            <span className="font-montHeavy text-[14px] leading-[20px] text-[#6e808e]">Taught</span>
          </div>{" "}
          <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-[10px] bg-[#C2EFF0] text-center">
            <h1 className="font-montHeavy text-[38px] capitalize leading-[50px] text-[#66C7C9]">1 +</h1>
            <span className="font-montHeavy text-[14px] leading-[20px] text-[#6e808e]">Countries Served</span>
          </div>{" "}
          <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-[10px] bg-[#C2EFF0] text-center">
            <h1 className="font-montHeavy text-[38px] capitalize leading-[50px] text-[#66C7C9]">1000 +</h1>
            <span className="font-montHeavy text-[14px] leading-[20px] text-[#6e808e]">
              Learning activities completed
            </span>
          </div>{" "}
          <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-[10px] bg-[#C2EFF0] text-center">
            <h1 className="font-montHeavy text-[38px] capitalize leading-[50px] text-[#66C7C9]">0 {`%`}</h1>
            <span className="font-montHeavy text-[14px] leading-[20px] text-[#6e808e]">Satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <div className="justify-items flex flex-row items-center justify-around flex-wrap gap-20  top-20 relative md:top-[-10vh] z-[2] mx-auto mt-[5] md:mt-[10vh] md:grid h-auto min-h-[20vh] md:min-h-[400px] w-[80%] md:grid-flow-row  md:grid-cols-3 md:items-start md:gap-4 md:pt-[10vh]">
      <div
        className="relative flex h-[344px]  min-w-[300px] max-w-[400px] flex-col items-start justify-center rounded-[20px]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
          backdropFilter: "blur(42px)",
        }}
      >
        <div className="absolute left-1/2 top-[-5vh] -translate-x-1/2 transform">
          <Image src="/images/user1.png" alt="image" height={"100"} width={100} />
        </div>
        <span className="font-montHeavy mx-auto w-[80%] text-center text-[14px] leading-[25px] text-[#404040]">
          “OIAI helped me on learning new strategies to follow and brighten up my career. It was like having a real
          human teacher.”
        </span>
        <div className="absolute bottom-3 mx-auto w-full text-center">
          <h1 className="font-montHeavy text-center text-[18px] capitalize leading-[20px] text-[#66C7C9]">Saiba</h1>
          <span className="font-montHeavy text-center text-[12px] text-[#80909C]">from Pakistan</span>
        </div>
      </div>
      <div
        className="relative flex h-[344px]  min-w-[300px] max-w-[400px] flex-col items-start justify-center rounded-[20px]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
          backdropFilter: "blur(42px)",
        }}
      >
        <div className="absolute left-1/2 top-[-5vh] -translate-x-1/2 transform">
          <Image src="/images/user2.png" alt="image" height={"100"} width={100} />
        </div>
        <span className="font-montHeavy mx-auto w-[80%] text-center text-[14px] leading-[25px] text-[#404040]">
          “OIAI helped me tremendously in understanding how should highlight my skills with my career objectives. I
          found it easy to use, and the suggestions she provides were always accurate.”
        </span>
        <div className="absolute bottom-3 mx-auto w-full text-center">
          <h1 className="font-montHeavy text-center text-[18px] capitalize leading-[20px] text-[#66C7C9]">John</h1>
          <span className="font-montHeavy text-center text-[12px] text-[#80909C]">from UK</span>
        </div>
      </div>
      <div
        className="relative flex h-[344px]  min-w-[300px] max-w-[400px] flex-col items-start justify-center rounded-[20px]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "4px 4px 116px 0px rgba(97, 120, 201, 0.16), 2px 2px 16px 0px rgba(255, 255, 255, 0.08) inset",
          backdropFilter: "blur(42px)",
        }}
      >
        <div className="absolute left-1/2 top-[-5vh] -translate-x-1/2 transform">
          <Image src="/images/user3.png" alt="image" height={"100"} width={100} />
        </div>
        <span className="font-montHeavy mx-auto w-[80%] text-center text-[14px] leading-[25px] text-[#404040]">
          “Love it! The AI teacher speaks in a way that is very close to a human one. Her kindness reminds me of my
          favourite teacher at college.”
        </span>
        <div className="absolute bottom-3 mx-auto w-full text-center">
          <h1 className="font-montHeavy text-center text-[18px] capitalize leading-[20px] text-[#66C7C9]">Barbara</h1>
          <span className="font-montHeavy text-center text-[12px] text-[#80909C]">from Denmark</span>
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="relative min-h-[400px] w-full gap-4 bg-[#83D5D6] px-5 md:min-h-[600px]">
      <div className="absolute top-10 flex flex-col items-center justify-center md:left-10 md:top-[22vh] md:px-5">
        <h1 className="font-montHeavy text-[82px] capitalize leading-[100px] text-white">OIAI</h1>
        <span className="w-full text-center font-montHeavy text-[18px] leading-[25px] text-white md:w-[15%]">
          upskilling a generation using Artificial Intelligence
        </span>
      </div>
      {/* socials */}
      <div className="absolute bottom-0 left-1/2 mt-10 flex -translate-x-1/2 flex-col items-center justify-center py-10 text-center md:mt-0">
        <div className="flex flex-row gap-5">
          <div className="max-h-[50px] max-w-[50px] cursor-pointer rounded-md bg-[#A1E2E3] p-[8px]">
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_i_567_558)">
                <g filter="url(#filter1_i_567_558)">
                  <path
                    d="M13.9394 2.81818H16.3521L11.081 8.84278L17.2821 17.0409H12.4267L8.62372 12.0688L4.27229 17.0409H1.85808L7.49611 10.5969L1.54736 2.81818H6.52605L9.96358 7.36289L13.9394 2.81818ZM13.0926 15.5968H14.4295L5.7996 4.18648H4.36492L13.0926 15.5968Z"
                    fill="#404040"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_i_567_558"
                  x="0.0507812"
                  y="0.657959"
                  width="18.6055"
                  height="22.6053"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_567_558" />
                </filter>
                <filter
                  id="filter1_i_567_558"
                  x="1.54736"
                  y="2.81818"
                  width="15.7349"
                  height="18.2227"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_567_558" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="max-h-[50px] max-w-[50px] cursor-pointer rounded-md bg-[#A1E2E3] p-[8px]">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_i_567_797)">
                <path
                  d="M7.09149 2.47415C4.49043 2.47415 2.37402 4.5918 2.37402 7.19351V13.9338C2.37402 16.5352 4.49167 18.6519 7.09338 18.6519H13.8337C16.4351 18.6519 18.5518 16.5343 18.5518 13.9326V7.19162C18.5518 4.59055 16.4342 2.47415 13.8324 2.47415H7.09149ZM15.3162 5.0626C15.6735 5.0626 15.9634 5.3525 15.9634 5.70971C15.9634 6.06691 15.6735 6.35682 15.3162 6.35682C14.959 6.35682 14.6691 6.06691 14.6691 5.70971C14.6691 5.3525 14.959 5.0626 15.3162 5.0626ZM10.4629 6.35682C12.7828 6.35682 14.6691 8.24315 14.6691 10.563C14.6691 12.8829 12.7825 14.7693 10.4629 14.7693C8.14302 14.7693 6.25669 12.8826 6.25669 10.563C6.25669 8.24347 8.14302 6.35682 10.4629 6.35682ZM10.4629 7.65104C8.85452 7.65104 7.55091 8.95465 7.55091 10.563C7.55091 12.1714 8.85452 13.475 10.4629 13.475C12.0713 13.475 13.3749 12.1714 13.3749 10.563C13.3749 8.95465 12.0713 7.65104 10.4629 7.65104Z"
                  fill="#272727"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_567_797"
                  x="0.108887"
                  y="0.20929"
                  width="20.7075"
                  height="24.7076"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_567_797" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="max-h-[50px] max-w-[50px] cursor-pointer rounded-md bg-[#A1E2E3] p-[8px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <g clip-path="url(#clip0_567_1037)" filter="url(#filter0_i_567_1037)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.06494 2.48955C1.06494 2.11166 1.21506 1.74924 1.48227 1.48203C1.74948 1.21482 2.1119 1.0647 2.48979 1.0647H16.6934C16.8806 1.06439 17.0661 1.10103 17.2392 1.17251C17.4123 1.24398 17.5696 1.3489 17.7021 1.48125C17.8346 1.6136 17.9397 1.77079 18.0114 1.94381C18.083 2.11682 18.1199 2.30228 18.1198 2.48955V16.6931C18.12 16.8804 18.0832 17.0659 18.0117 17.239C17.9401 17.4121 17.8351 17.5694 17.7027 17.7019C17.5703 17.8344 17.4131 17.9395 17.24 18.0111C17.0669 18.0828 16.8814 18.1196 16.6941 18.1195H2.48979C2.30262 18.1195 2.11727 18.0826 1.94435 18.011C1.77143 17.9393 1.61432 17.8343 1.482 17.7019C1.34968 17.5695 1.24474 17.4124 1.17318 17.2394C1.10162 17.0664 1.06484 16.8811 1.06494 16.6939V2.48955ZM7.81555 7.56724H10.1249V8.72697C10.4583 8.06028 11.311 7.46026 12.5925 7.46026C15.0491 7.46026 15.6313 8.78821 15.6313 11.2247V15.7381H13.1452V11.7798C13.1452 10.3921 12.8118 9.60917 11.9653 9.60917C10.7908 9.60917 10.3025 10.4534 10.3025 11.7798V15.7381H7.81555V7.56724ZM3.55185 15.6318H6.03875V7.46026H3.55185V15.6311V15.6318ZM6.39458 4.79505C6.39926 5.00799 6.36137 5.21971 6.28313 5.4178C6.20488 5.61589 6.08786 5.79636 5.93893 5.94861C5.78999 6.10086 5.61215 6.22183 5.41583 6.30441C5.21951 6.387 5.00867 6.42954 4.79569 6.42954C4.5827 6.42954 4.37186 6.387 4.17554 6.30441C3.97923 6.22183 3.80138 6.10086 3.65244 5.94861C3.50351 5.79636 3.38649 5.61589 3.30824 5.4178C3.23 5.21971 3.19211 5.00799 3.19679 4.79505C3.206 4.3771 3.37849 3.97936 3.67734 3.68702C3.97619 3.39468 4.37763 3.23099 4.79569 3.23099C5.21374 3.23099 5.61518 3.39468 5.91403 3.68702C6.21288 3.97936 6.38537 4.3771 6.39458 4.79505Z"
                  fill="#222222"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_567_1037"
                  x="0.289551"
                  y="0.289459"
                  width="18.6055"
                  height="22.6053"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_567_1037" />
                </filter>
                <clipPath id="clip0_567_1037">
                  <rect width="18.6053" height="18.6053" fill="white" transform="translate(0.289551 0.289459)" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <span className="mt-5 font-montHeavy text-[18px] leading-[25px] text-white">info@oiedu.co.uk </span>
        <br />
        <span className="font-montHeavy text-[18px] leading-[25px] text-white">
          ©{" "}
          <Link href="https://www.portfolio.oiedu.co.uk/" target="_blank">
            Otermans Institute
          </Link>{" "}
          2024 {" "}
        </span>
      </div>

      <div className="absolute bottom-0 right-0 w-auto">
        <Image src={"/images/chatbot4.png"} alt="image" height={100} width={100} className="w-[100px] md:w-[405px]" />
      </div>
    </div>
  )
}

const WhereTeachMeSection =()=>{
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
    }
   return (
     <>
       <div className="relative z-[2] mt-5 flex flex-col pt-10 ">
         <h1 className="my-6 text-center font-montHeavy text-[42px] leading-[60px] text-[#404040] md:text-[62px]">
           Where &nbsp;
           <span className="bg-gradient-to-r from-[#66C8C9] to-[#ACCEF4] bg-clip-text text-transparent">Teach Me</span>
           <br /> Can be used?
         </h1>
       </div>
       <WhereToSlider />
       
     </>
   )
}