import Image from "next/image"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { MoonLoader } from "react-spinners"
import { toast } from "react-toastify"
import { useAppContext } from "app/context/AppContext"
import { sendMessage } from "app/services/callapi"
const ChatComponent = () => {
  const { activeMenu, documentId, fullView, activeScript, setFullView, showChat, setShowChat, messages, setMessages } =
    useAppContext()
  const [text, setText] = useState("")
  const messagesEndRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const handleSendMessage = async () => {
    if (text) {
      let temp = text
      setText("")
      setLoading(true)
      const data = {
        query: temp,
        document_id: documentId,
      }
      const result = await sendMessage(data)
      setLoading(false)
      if (result?.success && result?.data) {
        setMessages((ps: any[]) => {
          // Check if ps is an array before spreading it
          const newArray = Array.isArray(ps) ? [...ps] : []
          return [...newArray, { query: result?.data?.query, response: result?.data?.response }]
        })
      } else {
        toast.error("Something went wrong!")
      }
    }
  }
  const scrollToBottom = () => {
    const divRef = document.getElementById("divRef")
    if (divRef) {
      divRef.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  useEffect(() => {
    if (messages?.length > 0 && documentId) {
      localStorage.setItem("chat", JSON.stringify(messages))
    }
  }, [messages])
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && documentId) {
      handleSendMessage(text)
    }
  }
  const handleChange = (e) => {
    setText(e?.target?.value)
  }
  return (
    <div className="absolute right-0 top-0 z-[120] mt-0 md:mt-2 flex h-full w-full flex-col items-start rounded-[20px] bg-white shadow-md">
      <div
        className="seld-start m-3 flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center rounded-full border-[3px] p-[10px]"
        onClick={() => setShowChat(false)}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.6529 4.5934L11.6761 10.3964L5.8731 11.4197M0.7534 7.83481L6.55643 6.81158L5.5332 1.00854"
            stroke="#66C7C9"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="flex h-[90%] w-full flex-col items-end justify-end p-4">
        <div className="max-h-[100%] w-full overflow-y-scroll pb-5">
          <div className="flex w-full flex-col items-start">
            <div className="flex max-w-[70%] flex-row items-end gap-2">
              <div className="rounded-[10px] bg-[#C2EFF0] p-3 shadow-md">
                <Image src="/images/oibot.png" height="21" width="21" alt="bot" />
              </div>

              <div className=" rounded-[20px] bg-[#C2EFF0] p-4 shadow-md">
                <h1 className="text-left text-[12px] font-[800] text-[#404040]">
                  {documentId
                    ? "Hi! I am OIAI! I help you understand everything. Ask me anything related to the document you uploaded!"
                    : "Please upload PDF to begin conversation."}
                </h1>
              </div>
            </div>

            {messages && messages?.length > 0 && (
              <>
                {messages?.map((each, index) => {
                  return (
                    <>
                      <div className="flex w-full flex-col" key={index}>
                        <div className="self-end">
                          <div className="my-2 flex flex-row items-end justify-end gap-2">
                            <div className="w-[70%] rounded-[20px] bg-[#CEE5F2] p-4 shadow-md">
                              <h1 className="text-left text-[12px] font-[800] text-[#404040]">{each?.query}</h1>
                            </div>
                            <div className="rounded-[10px] bg-[#C2EFF0] p-[10px] shadow-md">
                              <svg
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.3337 18.25C16.3337 15.7187 13.0504 13.6667 9.00033 13.6667C4.95024 13.6667 1.66699 15.7187 1.66699 18.25M9.00033 10.9167C6.46902 10.9167 4.41699 8.86464 4.41699 6.33333C4.41699 3.80203 6.46902 1.75 9.00033 1.75C11.5316 1.75 13.5837 3.80203 13.5837 6.33333C13.5837 8.86464 11.5316 10.9167 9.00033 10.9167Z"
                                  stroke="#66C7C9"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="self-start">
                          <div className="flex flex-row items-end gap-2">
                            <div className="rounded-[10px] bg-[#C2EFF0] p-3 shadow-md">
                              <Image src="/images/oibot.png" height="21" width="21" alt="bot" />
                            </div>

                            <div className="w-[70%] rounded-[20px] bg-[#C2EFF0] p-4 shadow-md">
                              <h1 className="text-left text-[12px] font-[800] text-[#404040]">{each?.response}</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
                <div id="divRef" ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>
        <div className="relative w-full">
          <input
            placeholder="Your message"
            value={text}
            disabled={documentId ? false : true}
            onChange={(e) => handleChange(e)}
            onKeyPress={handleKeyPress}
            className="w-full rounded-[20px] bg-[#E3ECF3] py-2 pl-4 pr-2 shadow-md outline-none"
          />
          {loading && (
            <div
              className="absolute right-4 top-0 flex h-full cursor-pointer flex-row items-center justify-center"
              onClick={() => handleSendMessage()}
            >
              <MoonLoader size={"24"} color="#404040" />
            </div>
          )}
          {!loading && (
            <div
              className="absolute right-4 top-0 flex h-full cursor-pointer flex-row items-center justify-center"
              onClick={() => handleSendMessage()}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.44846 12.5512L13.8908 8.10893M18.435 5.39787L14.6853 17.5846C14.3492 18.6767 14.1811 19.2231 13.8912 19.4041C13.6398 19.5612 13.3286 19.5875 13.0548 19.4739C12.7391 19.3429 12.4828 18.8313 11.9717 17.8089L9.59661 13.0588C9.51549 12.8966 9.47489 12.8158 9.42071 12.7455C9.37262 12.6831 9.31713 12.6269 9.25475 12.5789C9.18606 12.5259 9.10663 12.4862 8.95163 12.4087L4.1906 10.0282C3.16824 9.51702 2.65701 9.26119 2.52601 8.94548C2.4124 8.67168 2.43831 8.36013 2.59539 8.10873C2.77651 7.81885 3.3228 7.65044 4.4153 7.31429L16.602 3.56454C17.4609 3.30027 17.8905 3.16824 18.1806 3.27474C18.4333 3.36751 18.6325 3.56652 18.7253 3.81922C18.8317 4.10918 18.6996 4.53858 18.4356 5.3966L18.435 5.39787Z"
                  stroke="#66C7C9"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
