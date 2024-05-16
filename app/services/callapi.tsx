import axios from "axios"

const CancelToken = axios.CancelToken
const source = CancelToken.source()
// const Axios = axios.create({
//   baseURL: "http://13.40.134.77:8000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

export const baseUrl = "http://13.40.134.77:8000"

const Axios = axios.create({
  baseURL: baseUrl,
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
export const deleteSyllabus = async(data:any)=>{
  try{
    const response= await Axios.post('/syllabus/delete', data)
     if (response?.status === 200 && response?.data) {
      return response?.data
    } else {
      return { success: false }
    }
  }catch(e){
    return { success: false }
  }
}


export const updateScript = async (data: any, script_id) => {
  try {

    const response = await Axios.patch(`/script/update?script_id=${script_id}`, { ...data })
    if (response?.status === 200 && response?.data) {
      return response?.data
    } else {
      return { success: false }
    }
  } catch (e) {
    return { success: false }
  }
}

export const updateQna = async (data: any, question_id:any) => {
  try {
    const response = await Axios.patch(`/qna/update?question_id=${question_id}`, { ...data })
    if (response?.status === 200 && response?.data) {
      return {success:true, data:response?.data}
    } else {
      return { success: false }
    }
  } catch (e) {
    return { success: false }
  }
}

export const deleteQna = async(question_id: any)=>{
  try{
    const response = await Axios.post(`/qna/delete?question_id=${question_id}`)
     if (response?.status === 200 && response?.data) {
       return response?.data
     } else {
       return { success: false }
     }
  }catch(e){
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
