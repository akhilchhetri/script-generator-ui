import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppContext } from "app/context/AppContext"

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
      const response = await axios.post("http://13.40.134.77:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response?.status === 200) {
        let data = response?.data
        if (data?.success) {
          setDocumentId(data?.data?.document_id)
          toast.success("File uploaded successfully")
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
      <div className="flex min-h-[100vh] w-full flex-col items-center justify-between bg-gradient-to-r from-[#C2EFF0] to-white to-100% md:flex-row">
        <section className="h-[50%] w-[90%] overflow-hidden bg-transparent md:h-full md:w-[45%]">
          <Image
            src="/images/oi.png"
            height={"100"}
            width={"100"}
            alt="image"
            className="mx-5 mt-5 w-[20%] cursor-pointer"
          />
          <div className="ml-10 mt-10 flex flex-col">
            <h1 className="text-[40px] font-bold leading-none text-[#404040] md:text-[82px]">
              Teach Me <br />
              By{" "}
              <span className="bg-gradient-to-r from-[#66C8C9] to-[#ACCEF4] bg-clip-text text-transparent">OIAI</span>
            </h1>
            <p className="mt-5 w-full text-[22px] font-[300] leading-normal text-[#404040] md:w-[30%]">
              Upload any PDF and text and let our AI teach you.
            </p>
          </div>

          <Image
            src={"/images/chatbot.png"}
            width={"900"}
            height={"900"}
            className="mx-auto hidden w-[70%] md:block"
            alt="chatbot"
          />
        </section>
        <section className="mx-auto h-full w-[100%] bg-transparent md:w-[50%] ">
          <div className="mx-auto mt-[80px] flex h-[85%] w-[95%] flex-col items-center gap-2 rounded-[20px] bg-[#66C7C9] p-2">
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
    )
  } else {
    return null
  }
}
export default Dashboard
// <div className="h-[100vh] w-[100vw] bg-red-500 bg-gradient-to-r from-teal-300 to-white to-70% md:w-[20vw] lg:w-[15vw]">
