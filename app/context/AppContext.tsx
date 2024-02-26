import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface ContextData {
  documentId: any | undefined
  setDocumentId: Dispatch<SetStateAction<string | undefined>>
  documentData: Object
  setDocumentData: Dispatch<any>
  activeMenu: number
  setActiveMenu: Dispatch<SetStateAction<number>>
  file: string | undefined
  setFile: Dispatch<SetStateAction<string | undefined>>
  expandedEv: boolean
  setExpandedEv: Dispatch<SetStateAction<boolean>>
  expandedTs: boolean
  setExpandedTs: Dispatch<SetStateAction<boolean>>
  activeScript: any
  setActiveScript: Dispatch<SetStateAction<undefined>>
  fullView: boolean
  setFullView: Dispatch<SetStateAction<boolean>>
  showChat: boolean
  setShowChat: Dispatch<SetStateAction<boolean>>
  messages: Array<[]>
  setMessages: Dispatch<any>
  tableOfContent: Array<[]>
  setTableOfContent: Dispatch<any>
  resetState: any
  eachIndex: number
  setEachIndex: Dispatch<SetStateAction<number>>
}
const AppContext = createContext<ContextData>({
  documentId: undefined,
  setDocumentId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.")
  },
  documentData: {},
  setDocumentData: function (value: any): void {
    throw new Error("Function not implemented.")
  },
  activeMenu: 0,
  setActiveMenu: function (value: SetStateAction<number>): void {
    throw new Error("Function not implemented.")
  },
  file: undefined,
  setFile: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.")
  },
  expandedEv: false,
  setExpandedEv: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.")
  },
  expandedTs: false,
  setExpandedTs: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.")
  },
  activeScript: undefined,
  setActiveScript: function (value: SetStateAction<undefined>): void {
    throw new Error("Function not implemented.")
  },
  fullView: false,
  setFullView: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.")
  },
  showChat: false,
  setShowChat: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.")
  },
  messages: [],
  setMessages: function (value: any): void {
    throw new Error("Function not implemented.")
  },
  tableOfContent: [],
  setTableOfContent: function (value: any): void {
    throw new Error("Function not implemented.")
  },
  resetState: function (value: any): void {
    throw new Error("Function not implemented")
  },
  eachIndex: 0,
  setEachIndex: function (value: SetStateAction<number>): void {
    throw new Error("Function not implemented.")
  },
})
export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }: { children: any }) => {
  const [documentId, setDocumentId] = useState<string | undefined>(undefined)
  const [documentData, setDocumentData] = useState({})
  const [eachIndex, setEachIndex] = useState(0)
  const [activeMenu, setActiveMenu] = useState(1)
  const [file, setFile] = useState(undefined)
  const [expandedEv, setExpandedEv] = useState(false)
  const [expandedTs, setExpandedTs] = useState(false)
  const [activeScript, setActiveScript] = useState(undefined)
  const [fullView, setFullView] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [tableOfContent, setTableOfContent] = useState([])
  const [messages, setMessages] = useState([])
  useEffect(() => {
    setDocumentId(localStorage?.getItem("documentId"))
    setFile(localStorage?.getItem("file_name"))
    let doc_data: any = localStorage?.getItem("documentData")
    doc_data = JSON.parse(doc_data)
    let message: any = localStorage.getItem("chat")
    message = JSON.parse(message)
    setDocumentData(doc_data)
    setMessages(message)
    setTableOfContent(documentData?.table_of_contents)
  }, [])
  useEffect(() => {
    if (documentData && documentId) {
      setTableOfContent(documentData?.table_of_contents)
    }
  }, [documentData])
  const resetState = () => {
    setDocumentId(undefined)
    setDocumentData({})
    setFile(undefined)
    setMessages([])
    setActiveScript(undefined)
    setFullView(false)
    setTableOfContent([])
    setMessages([])
    setExpandedEv(false)
    setExpandedTs(false)
    localStorage.removeItem("documentId")
    localStorage.removeItem("documentData")
    localStorage.removeItem("chat")
    localStorage.removeItem("eq")
    localStorage.removeItem("teaching_script")
    localStorage.removeItem("file_name")
  }

  return (
    <AppContext.Provider
      value={{
        documentId,
        setDocumentId,
        activeMenu,
        setActiveMenu,
        documentData,
        setDocumentData,
        file,
        setFile,
        tableOfContent,
        setTableOfContent,
        resetState,
        fullView,
        setFullView,
        activeScript,
        setActiveScript,
        showChat,
        setShowChat,
        expandedEv,
        setExpandedEv,
        expandedTs,
        setExpandedTs,
        messages,
        setMessages,
        eachIndex,
        setEachIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
