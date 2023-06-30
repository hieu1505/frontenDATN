import http from "../utils/http";

const activityApi={
    createActivity(id,data,config){
        return http.post(`/activity/${id}`,data, config)
    },
    getAllactivity(id,config){
        return http.get(`/activity/center/${id}`,config)
    },
    getActivityByid(id,config)
    {
        return http.get(`/activity/${id}`,config)
    },
    updateActivity(id,data,config){
        return http.post(`/activity/update/${id}`,data, config)
    },
    deleteActivity(id,config){
        return http.delete(`/activity/${id}`, { id: id }, config)
    }
}
export default activityApi