class Path {
    constructor() {
        this.home = '/'
        this.auth = '/auth'
        this.login = '/login'
        this.register = '/register'
        this.forgotPassword = '/forgotPassword'
        this.profile = '/profile'
        this.system = '/system'
        this.veirifyEmail = '/auth/verify-account'
    }
}

export const path = new Path()