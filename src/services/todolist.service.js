import { axiosInstance } from "../utils/axios"

export const getToDoLists = (limit) => {
    return axiosInstance.get(`/todos/?limit=${limit}`)
}

export const getUsers = () => {
    return axiosInstance.get("/users?limit=1")
}
