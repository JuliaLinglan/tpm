const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.username,
  // company: state => state.user.company,
  // logo: state => state.user.logo,
  // email: state => state.user.email,
  // user_status: state => state.user.status,
  // permission_routes: state => state.permission.routes,
  roles: state => state.user.roles,
  role: state => state.user.role,
  access_routes: state => state.permission.routes,
}
export default getters
