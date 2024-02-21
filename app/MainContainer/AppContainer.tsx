import { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"
import { useAppContext } from "app/context/AppContext"
import Dashboard from "app/pages/dashboard"
import Sidebar from "components/SideBar/Sidebar"
import MainContainer from "./MainContainer"

const AppContainer = () => {
  const { documentId, setDocumentId } = useAppContext()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  if (documentId && !loading) {
    return (
      <>
        <div className="h-[100vh] w-[25vw] md:w-[20vw] lg:w-[15vw]">
          <Sidebar />
        </div>
        <div className="mx-auto my-[23px] w-[75vw] self-auto rounded-[20px]  bg-[#E3ECF3] px-4 py-8 text-center md:w-[80vw] lg:w-[85vw]">
          <div className="mx-auto h-full w-full">
            <MainContainer />
            <div className="flex flex-row justify-start">
              <div className="w-full">
                <div className="mb-6 hidden">
                  <label
                    htmlFor="large-input"
                    className="my-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Or Enter Text
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else if (!documentId && !loading) {
    return <Dashboard />
  } else {
    return (
      <div className="flex min-h-[100vh] w-full flex-row items-center justify-center ">
        <MoonLoader color="#66C7C9" />
      </div>
    )
  }
}

export default AppContainer
