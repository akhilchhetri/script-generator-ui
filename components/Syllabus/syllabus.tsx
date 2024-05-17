import { useEffect, useState } from "react"
import { TiTick } from "react-icons/ti"
import { MoonLoader } from "react-spinners"
import { toast } from "react-toastify"

import { useAppContext } from "app/context/AppContext"
import { deleteSyllabus, generateSyllabus,stopAllPromises, updateSyllabus } from "app/services/callapi"
import { IoIosRefresh } from "react-icons/io"
const Syllabus = () => {
  const {
    activeMenu,
    documentId,
    documentData,
    setDocumentData,
    tableOfContent,
    setTableOfContent,
    setExpandedEv,
    setExpandedTs,
  } = useAppContext()

  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [showUpdate, setShowUpdate] = useState(false)
  const [eachEdit, setEachEdit] = useState(undefined)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setExpandedEv(false)
    setExpandedTs(false)
  }, [])
  useEffect(() => {
    if (tableOfContent?.length !== documentData?.contents?.length && edit) {
      setShowUpdate(true)
    } else {
      // setShowUpdate(false)
    }
  }, [tableOfContent])

  const handleSaveTitle = async(index:any, each: any) => {
    let updated_content = []
    toast.success("Updating title.")
    each.name = title
    tableOfContent?.map((e, i) => {
      if (each?.id !== e?.id) {
        updated_content.push(e)
      }
      if (each?.id === e?.id) {
        updated_content.push(each)
      }
    })
    const response = await updateSyllabus(each)
     if (response?.error) {
      toast.error("Error occured!")
     } else {
      setTableOfContent(tableOfContent)
      if (response?.id) {
        setDocumentData(documentData)
        localStorage.setItem("documentData", JSON.stringify(documentData))
      }
      toast.success("Syllabus updated successfully.")
     }
    setEditId(undefined)
    setEdit(false)
    setTitle(undefined)
  }

  const handleRemoveTitle = async(index, data) => {
    let updated_content = []
    tableOfContent?.map((each, i) => {
      if (index !== i) {
        updated_content.push(each)
      }
    })
    const response = await deleteSyllabus(data)
    if(response && !response?.success){
      toast.error(response?.message || "Error occured")
    }else{
      toast.success(data?.message || "Heading deleted successfully")
      setTableOfContent(updated_content)
      setDocumentData(documentData)
      localStorage.setItem("documentData", JSON.stringify(documentData))
    }
  }
  const handleRegenerate = async()=>{
    try{
      setLoading(true)
      let temp = documentData
      setDocumentData(undefined)
      toast.success("Generating Syllabus")
      const result = await generateSyllabus(documentId)
      if(result?.success){
        setDocumentData(result?.data || temp)
        localStorage.setItem("documentData", JSON.stringify(documentData))
        toast.success("Syllabus Regenerated")
        setLoading(false)
      }else{
        toast.error("Error generating Syllabus")
        setLoading(false)
      }
    }catch(e){
      console.log("this is e", e)
    }
  }

  return (
    <div className="relative ml-3 flex flex-col items-start">
      <h1 className="hidden text-left text-[28px] font-[800] leading-[35.78px] text-[#404040] md:block">Syllabus</h1>
      {!loading && (
        <button
          className="mt-2 flex max-w-[250px] flex-row items-center justify-around gap-2 rounded-[15px] bg-[#66C7C9] p-1 md:px-3 md:py-2 text-[16px] font-[700] text-white"
          onClick={() => handleRegenerate()}
        >
          <IoIosRefresh size={24} />
          <span className="hidden md:block">Regenerate</span>
        </button>
      )}

      <div className="mt-6 flex flex-col items-start gap-2">
        {documentData && documentData?.document_id && (
          <>
            {tableOfContent?.map((each, index) => {
              return (
                <div className="flex flex-row items-center gap-2 rounded-[20px] bg-white px-4 py-2" key={index}>
                  <span className="h-6 w-6 rounded-full bg-[#66C7C9] text-center text-[16px] font-[800] text-[#FEFEFE]">
                    {index + 1}
                  </span>
                  {editId !== index && (
                    <span className="text-left text-[16px] font-[800] text-[#404040]">
                      {each?.name?.slice(0, 70)}
                      {each?.name?.length > 69 ? " ..." : ""}
                    </span>
                  )}
                  {edit && editId === index && (
                    <input
                      value={title}
                      onChange={(e) => setTitle(e?.target?.value)}
                      className="w-[50vw] font-[600] outline-none"
                      key={index}
                    />
                  )}
                  <div className="ml-4 flex flex-row gap-1 self-end">
                    {editId !== index && (
                      <button
                        className=""
                        onClick={() => {
                          setEditId(index)
                          setEdit(true)
                          setTitle(each?.name)
                        }}
                        key={index}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
                            stroke="#66C7C9"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    )}

                    {edit && editId === index && (
                      <button
                        className=""
                        onClick={() => {
                          handleSaveTitle(index, each)
                        }}
                        key={index}
                      >
                        <TiTick color="#66C7C9" size={"26"} />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleRemoveTitle(index, each)
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 12H16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                          stroke="#66C7C9"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default Syllabus
