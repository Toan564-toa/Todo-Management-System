import { axiosInstance } from "../utils/axios"

export const getUsers = (limit) => {
    return axiosInstance.get(`/users?limit=${limit}`)
}