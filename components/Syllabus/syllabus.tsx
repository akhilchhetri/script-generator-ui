import { useEffect, useState } from "react"
import { TiTick } from "react-icons/ti"
import { MoonLoader } from "react-spinners"
import { toast } from "react-toastify"

import { useAppContext } from "app/context/AppContext"
import { stopAllPromises, updateSyllabus } from "app/services/callapi"
const Syllabus = () => {
  const { activeMenu, documentId, documentData, setDocumentData, tableOfContent, setTableOfContent } = useAppContext()

  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [showUpdate, setShowUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (tableOfContent?.length !== documentData?.table_of_contents?.length && edit) {
      setShowUpdate(true)
    } else {
      // setShowUpdate(false)
    }
  }, [tableOfContent])

  const handleSaveTitle = (index) => {
    let updated_content = []
    tableOfContent?.map((each, i) => {
      if (index !== i) {
        updated_content.push(each)
      }
      if (index === i) {
        let data = { ...each }
        data.heading = title
        updated_content.push(data)
      }
    })
    toast.success("Title updated!")
    setTableOfContent(updated_content)
    setShowUpdate(true)
    setEditId(undefined)
    setEdit(false)
    setTitle(undefined)
  }

  const handleRemoveTitle = (index) => {
    setShowUpdate(true)
    toast.success("Title removed!")
    let updated_content = []
    tableOfContent?.map((each, i) => {
      if (index !== i) {
        updated_content.push(each)
      }
    })
    setTableOfContent(updated_content)
  }
  const handleUpdateSyllabus = async () => {
    setLoading(true)
    const data = {
      document_id: documentId,
      table_of_contents: tableOfContent,
    }
    const response = await updateSyllabus(data)
    if (response?.success) {
      setTableOfContent(response?.data?.table_of_contents || tableOfContent)
      if (response?.data) {
        setDocumentData(response?.data || documentData)
        localStorage.setItem("documentData", JSON.stringify(response?.data))
      }
      toast.success("Syllabus updated successfully.")
    } else {
      toast.error("Error occured!")
    }
    setLoading(false)
    setShowUpdate(false)
  }
  return (
    <div className="relative ml-5 flex flex-col items-start">
      <h1 className="text-left text-[28px] font-[800] leading-[35.78px] text-[#404040]">Syllabus</h1>
      {showUpdate && (
        <button
          className="mt-2 rounded-[15px] bg-[#66C7C9] px-3 py-2 text-[16px] font-[700] text-white"
          onClick={() => handleUpdateSyllabus()}
        >
          {showUpdate && (
            <>
              {loading ? (
                <div className="flex flex-row items-center gap-2">
                  <span>Updating</span>
                  <MoonLoader size={"16"} />
                </div>
              ) : (
                "Save Changes"
              )}
            </>
          )}
        </button>
      )}
      <div className="mt-6 flex flex-col items-start gap-2">
        {documentData && documentData?.document_id && (
          <>
            {tableOfContent?.map((each, index) => {
              return (
                <div className="flex flex-row items-center gap-2 rounded-[20px] bg-white px-4 py-2" key={index}>
                  <span className="rounded-fßll h-6 w-6 bg-[#66C7C9] text-center text-[16px] font-[800] text-[#FEFEFE]">
                    {index + 1}
                  </span>
                  {editId !== index && (
                    <span className="text-[16px] font-[800] text-[#404040]">
                      {each?.heading?.slice(0, 70)}
                      {each?.heading?.length > 69 ? " ..." : ""}
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
                          setTitle(each?.heading)
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
                          handleSaveTitle(index)
                        }}
                        key={index}
                      >
                        <TiTick color="#66C7C9" size={"26"} />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleRemoveTitle(index)
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
