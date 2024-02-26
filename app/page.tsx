"use client" // This is a client component 👈🏽
import axios from "axios"
import { Metadata } from "next"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

import { Button } from "components/Button/Button"
import Sidebar from "components/SideBar/Sidebar"
import Syllabus from "components/Syllabus/syllabus"
import { LP_GRID_ITEMS } from "lp-items"
import { AppContextProvider, useAppContext } from "./context/AppContext"
import AppContainer from "./MainContainer/AppContainer"
import MainContainer from "./MainContainer/MainContainer"
import Dashboard from "./pages/dashboard"

export default function Web() {
  const { documentId } = useAppContext()
  useEffect(() => {
    if (documentId) {
      alert("document Id")
    }
  }, [documentId])
  return (
    <>
      <AppContextProvider>
        <section className="flex w-full flex-row bg-white dark:bg-gray-900">
          <ToastContainer />
          <AppContainer />
        </section>
      </AppContextProvider>
    </>
  )
}
