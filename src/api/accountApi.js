import http from "../utils/http";
const accountApi={
    getaccountById(id,config){
        return http.get(`/account/${id}`, config)
    },
    updateprofile(id,data,config){
        return http.post(`/account/profile/${id}`,data, config)
    },
    changepassword(id,data,config){
        return http.post(`/account/password/${id}`,data, config)
    },
    resetpassword(data){
        return http.post(`/account/resetpw`,data)
    },
    getAllaccount(params){
        return http.get(`/account`, params)
    },
    CreateAccount(data,config){
        return http.post(`/account/create/`,data, config)
    },
    deleteAcount(id,config){
        return http.delete(`/account/${id}`, { id: id }, config)
    },
    updateaccount(id,data,config){
        return http.post(`/account/update/${id}`,data, config)
    }

}
export default accountApi