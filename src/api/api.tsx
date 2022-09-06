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
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId:number){
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}

export default usersAPI