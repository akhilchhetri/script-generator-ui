import { useAppContext } from "app/context/AppContext"

const menus = [
  { id: 1, name: "Syllabus" },
  { id: 2, name: "Scripts" },
  { id: 3, name: "Questions" },
]

const TabContainer =()=>{
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
    return (
      <div className="flex md:hidden flex-row items-center justify-between px-2 rounded-[20px] py-1 bg-[#FFFFFF] max-w-[290px] mx-auto mb-3">
        {menus?.map((item, index) => {
          return (
            <div
              key={index}
              className={`spacing-md flex cursor-pointer flex-row items-center justify-around rounded-[20px] px-2 py-1 font-[800] text-[#6E808E] ${
                activeMenu === item?.id ? "bg-[#66C7C9] text-white" : "bg-white"
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
    )
}

export default TabContainer