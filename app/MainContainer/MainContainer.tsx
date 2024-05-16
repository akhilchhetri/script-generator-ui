import Image from "next/image"
import { useEffect } from "react"
import { useAppContext } from "app/context/AppContext"
import ChatComponent from "components/Chat/ChatComponent"
import Evaluation from "components/Evaluation/Evaluation"
import ExpandedEvaluation from "components/Evaluation/ExpandedEvaluation"
import Syllabus from "components/Syllabus/syllabus"
import ExpandedScript from "components/TeachingScript/ExpandedScript"
import TeachingScript from "components/TeachingScript/TeachingScript"
const MainContainer = () => {
  const {
    activeMenu,
    documentId,
    expandedTs,
    expandedEv,
    activeScript,
    setFullView,
    showChat,
    setShowChat,
    setExpandedEv,
    setExpandedTs,
    resetState,
    setActiveScript,
  } = useAppContext()
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!documentId) {
  //       resetState()
  //     }
  //   }, 3000)
  // }, [])
  return (
    <div className="relative m-0 h-full p-0">
      {activeMenu === 1 && documentId && <Syllabus />}
      {!expandedTs && activeMenu === 2 && documentId && <TeachingScript />}
      {!expandedEv && activeMenu === 3 && documentId && <Evaluation />}
      {expandedTs && (
        <ExpandedScript
          documentId={documentId}
          showChat={showChat}
          activeScript={activeScript}
          setExpandedTs={setExpandedTs}
        />
      )}
      {expandedEv && (
        <>
          <ExpandedEvaluation
            showChat={showChat}
            activeScript={activeScript}
            setExpandedEv={setExpandedEv}
            setActiveScript={setActiveScript}
            documentId={documentId}
          />
        </>
      )}
      {showChat && (
        <div className="top fixed bottom-0 right-0 md:bottom-[63px] md:right-[15px]  z-[120] h-[100vh] md:h-[87.7vh] w-[100%] md:w-[45%] lg:w-[38%] 2xl:h-[90vh]">
          <ChatComponent />
        </div>
      )}
      {!showChat && (
        <div className="fixed bottom-5 right-5 z-[120] flex w-[20%] flex-row items-start justify-end ">
          <div
            className="cursor-pointer self-end rounded-full"
            onClick={() => setShowChat(true)}
          >
            <Image alt="chat" src="/images/chat.png" className="m-0 md:mb-5" height="100" width="100" />
          </div>
        </div>
      )}
    </div>
  )
}

export default MainContainer
