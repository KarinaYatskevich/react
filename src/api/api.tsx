import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "571cf73a-57c1-4d8c-becf-c1f8c81f9502"
    },
})

const usersAPI = {
    requestUsers(currentPage:number = 1, pageSize:number = 10){
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
        return profileAPI.getProfile(userId)
    },
}
export const profileAPI = {
    getProfile(userId:number){
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId:number){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status:string){
        return instance.put(`profile/status`, {status: status})
    }
}
export const authAPI = {
    me(){
        return instance.get(`auth/me`)
    },
    login(email:string, password:string, rememberMe:boolean=false){
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete(`auth/login`)
    },
}

export default usersAPI