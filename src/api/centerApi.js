import http from "../utils/http";
const centerApi={
    getallcenter(params){
        return http.get(`/center`, params)
    },
    getcenterByid(id,config){
        return http.get(`/center/${id}`, config)
    },upoload(id,data,config){
        return http.post(`/center/${id}`,data, config)
    }, deleteCenter(id,config){
        return http.delete(`/center/${id}`, { id: id }, config)
    },getcenterByacountid(id,config){
        return http.get(`/center/acount/${id}`, config)
    },
    createCenter(data,config){
        return http.put(`/center/`,data, config)
    }
}
export default centerApi