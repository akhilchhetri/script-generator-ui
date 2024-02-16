import axios from "axios"

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const Axios = axios.create({
  baseURL: "http://13.40.134.77:8000",
  headers: {
    "Content-Type": "application/json",
  },
})
const requestInterceptor = axios.interceptors.request.use((config) => {
  // Cancel the request
  config.cancelToken = source.token
  return config
})
export const stopAllPromises = async () => {
  // Remove the request interceptor to stop intercepting requests
  axios.interceptors.request.eject(requestInterceptor)
  // Cancel the token to stop all pending requests
  source.cancel("All requests canceled")
}
export const generateScript = async (data: any) => {
  try {
    const response = await Axios.post("/script/generate", { ...data }, { cancelToken: source.token })
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
