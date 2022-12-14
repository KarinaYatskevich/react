import axios, {AxiosResponse} from "axios";
import {ProfileType} from '../types/types';

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
    },
    savePhoto(photoFile:any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile:ProfileType) {
        return instance.put(`profile`, profile );
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    me(){
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email:string, password:string, rememberMe:boolean=false){
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe})
            .then(res => res.data);
    },
    logout(){
        return instance.delete(`auth/login`)
    },
}

export default usersAPI