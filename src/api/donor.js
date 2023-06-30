import http from "../utils/http";
const donorapi={
    getdonorByIdcenter(id,config){
        return http.get(`/donor/${id}`, config)
    },
    
    

}
export default donorapi