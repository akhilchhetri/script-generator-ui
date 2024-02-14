import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext({})
export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }: { children: any }) => {
  const [documentId, setDocumentId] = useState(localStorage?.getItem("documentId") || undefined)
  const doc_data = localStorage?.getItem("documentData")
  let message: any = localStorage.getItem("chat")
  message = JSON.parse(message)
  const [documentData, setDocumentData] = useState(JSON.parse(doc_data) || {})
  const [activeMenu, setActiveMenu] = useState(1)
  const [file, setFile] = useState(localStorage?.getItem("file_name") || undefined)
  const [expandedEv, setExpandedEv] = useState(false)
  const [expandedTs, setExpandedTs] = useState(false)
  const [activeScript, setActiveScript] = useState(undefined)
  const [fullView, setFullView] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [tableOfContent, setTableOfContent] = useState(documentData?.table_of_contents || [])
  const [messages, setMessages] = useState(message || [])

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
    localStorage.removeItem("chat")
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
