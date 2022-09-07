import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "571cf73a-57c1-4d8c-becf-c1f8c81f9502"
    },
})

const usersAPI = {
    getUsers(currentPage:number = 1, pageSize:number = 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId:number){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId:number){
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId:number){
        return instance.get(`profile/${userId}`)
    },
}

export const authAPI = {
    me(){
        return instance.get(`auth/me`)
    }
}

export default usersAPI