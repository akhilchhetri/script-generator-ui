import axios from "axios"
const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

export const generateScript = async (data: any) => {
  try {
    const response = await Axios.post("/script/generate", { ...data })
    if (response?.status === 200 && response?.data) {
      return response?.data
    } else {
      return { success: false }
    }
  } catch (e) {
    return { success: false }
  }
}

export const generateEvaluation = async (data: any) => {
  try {
    const response = await Axios.post("/script/qna/generate", { ...data })
    if (response?.status === 200 && response?.data) {
      return response?.data
    } else {
      return { success: false }
    }
  } catch (e) {
    return { success: false }
  }
}

export const updateSyllabus = async (data: any) => {
  try {
    const response = await Axios.patch("/syllabus/update", { ...data })
    if (response?.status === 200 && response?.data) {
      return response?.data
    } else {
      return { success: false }
    }
  } catch (e) {
    return { success: false }
  }
}

export const sendMessage = async (data: any) => {
  try {
    const response = await Axios.post("/chat", { ...data })
    if (response?.status === 200 && response?.data) {
      return response?.data
    } else {
      return { success: false }
    }
  } catch (e) {
    return { success: false }
  }
}
