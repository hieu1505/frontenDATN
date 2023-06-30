import http from "../utils/http";


const notificationApi = {
    getNotification(idUser, config) {
        return http.get(`/notification/account/${idUser}`, config)
    },
    changeStatus(idNotify, config) {
        return http.put(`/notification/${idNotify}`, { id: idNotify }, config )
    }
}
export default notificationApi