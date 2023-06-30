import http from "../utils/http";
const childrenApi={
    getallchildrent(id,data){
        return http.get(`/children/center/${id}`,data)
    },
    createchildrent(id,data,config){
        return  http.post(`/children/create/${id}`,data, config)
    },
    getchildrenbyid(id,config){
        return http.get(`/children/${id}`,config)
    },
    deletechildren(id,config){
        return http.delete(`/children/${id}`, { id: id }, config)
    },
    upoload(id,data,config){
        return http.put(`/children/${id}`,data, config)
    }
    
}
export default childrenApi