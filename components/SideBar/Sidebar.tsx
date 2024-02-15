import axios from "axios"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MdOutlineDeleteSweep } from "react-icons/md"

import { MoonLoader } from "react-spinners"

import "react-toastify/dist/ReactToastify.css"

import { toast } from "react-toastify"
import { useAppContext } from "app/context/AppContext"
const menus = [
  { id: 1, name: "Syllabus" },
  { id: 2, name: "Teaching Script" },
  { id: 3, name: "Evaluation Questions" },
]

const Sidebar = () => {
  const {
    documentId,
    setDocumentId,
    activeMenu,
    setActiveMenu,
    setFile,
    file,
    setDocumentData,
    resetState,
    setExpandedEv,
    setExpandedTs,
  } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(undefined)
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

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response?.status === 200) {
        let data = response?.data
        if (data?.success) {
          toast.success("File uploaded successfully")
          localStorage.setItem("documentId", data?.data?.document_id)
          setDocumentData(data?.data)
          localStorage.setItem("documentData", JSON.stringify(data?.data))
          localStorage.setItem("file_name", selectedFile?.name)
          setFile(selectedFile?.name)
          setDocumentId(data?.data?.document_id)
        } else {
          toast.error("Something went wrong, Please try again.")
        }
      }

      if (response) {
        console.log("File uploaded successfully")
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
  const handleRemoveFile = () => {
    resetState()
    localStorage.removeItem("documentId")
    localStorage.removeItem("documentData")
    localStorage.removeItem("file_name")
    toast.success("File removed!")
  }
  return (
    <div className="fixed  h-[100vh] w-[25vw]  md:w-[20vw] lg:w-[15vw]">
      <Image
        src={"/images/oi.png"}
        width={"100"}
        height={"100"}
        alt="img"
        className="mx-auto mt-[35px] h-[50px] w-[180px] cursor-pointer"
      />
      {documentId && file && (
        <div className="ml-5 pt-10">
          {menus?.map((item, index) => {
            return (
              <div
                key={index}
                className={`spacing-md cursor-pointer rounded-l-[20px] px-4 py-6 font-[800] text-[#6E808E] ${
                  activeMenu === item?.id ? "bg-[#E3ECF3]" : "bg-white"
                }`}
                onClick={() => {
                  setActiveMenu(item?.id)
                  if (item?.id === 1) {
                    setExpandedEv(false)
                    setExpandedEv(false)
                  }
                  if (item?.id === 2) {
                    setExpandedEv(false)
                  }
                  if (item?.id === 3) {
                    setExpandedTs(false)
                  }
                }}
              >
                {item?.name}
              </div>
            )
          })}
        </div>
      )}

      <div className="relative flex flex-col items-center">
        <div className="bg-grey-lighter fixed bottom-20 flex  w-[100%] flex-col items-center justify-center gap-4">
          {loading && <MoonLoader size={29} color="#66C7C9" />}
          {!file && (
            <label className="flex w-auto cursor-pointer flex-row items-center justify-center gap-1 rounded-lg border bg-[#ACCEF4] p-4  tracking-wide shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 18V12M12 12L9 14M12 12L15 14M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="text-[14px] font-[800] leading-normal text-white">Upload PDF File</span>
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          )}

          {file && (
            <button onClick={() => handleRemoveFile()} className="mt-2 flex flex-row items-center justify-center gap-1">
              <MdOutlineDeleteSweep color="red" />
              <span className="text-red-500">{file?.slice(0, 17)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
