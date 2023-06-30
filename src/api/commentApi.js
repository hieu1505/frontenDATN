import http from "../utils/http";
const commentApi={
    getallcommentbyactivity(id,config){
        return http.get(`/comment/${id}`,config)
    },
    postcomment(data,config){
        return http.post(`/comment/`,data,config)
    }
   
}
export default commentApi