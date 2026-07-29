import { axiosInstance } from "../utils/axios"

export const getToDoLists = (limit, skip) => {
    return axiosInstance.get(`/todos/?limit=${limit}`)
}

