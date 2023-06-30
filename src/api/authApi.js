import http from "../utils/http";
const authApi = {
    login(data) {
        return http.post('/auth/login', data)
    },
    signup(data, config) {
        return http.post('/auth/singin', data, config)
    },
    verifyAccount(token) {
        return http.get(`/auth/verify-account?token=${token}`)
    }
}
export default authApi