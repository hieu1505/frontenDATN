import http from "../utils/http";
const AdropApi={
    getadroprequestbyidcenter(id,config){
        return http.get(`/adropt_request/center/${id}`, config)
    },
    getadropdetail(id,config){
        return http.get(`/adropt_detail/${id}`, config)
    
    },
    getlistProof(id,config){
        return http.get(`/proofs/${id}`, config)
    },
    getadroprequestbyid(id,config){
        return http.get(`/adropt_request/${id}`, config)
    },
    updatadroprequest(id,data,config){
        return http.put(`/adropt_request/${id}`,data, config)
    }


}
export default AdropApi