const getIsLoggedIn = state => state.auth.isLoggedIn;
const getIsRefreshing = state => state.auth.isRefreshing;
const getAccessToken = state => state.auth.accessToken;

export { getIsLoggedIn, getIsRefreshing, getAccessToken };
