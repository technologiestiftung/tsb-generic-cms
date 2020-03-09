import { action, thunk, computed } from 'easy-peasy';

import UserApi from '~/services/UserApi'; // eslint-disable-line
import LocalStorage from '~/services/LocalStorage';

const UserModel = {
  email: LocalStorage.getUserEmail(),
  token: LocalStorage.getUserToken(),
  refreshToken: LocalStorage.getUserRefreshToken(),
  userId: LocalStorage.getUserId(),
  role: LocalStorage.getUserRole(),
  loginError: null,
  loading: false,

  isAuthenticated: computed(
    state => !!state.token && !!state.userId && !!state.refreshToken
  ),

  login: thunk((action, payload) => {
    action.loginStart();

    UserApi.login(payload).then(res => {
      if (res.error) {
        return action.loginFail(res);
      }
      return action.loginSuccess(res);
    });
  }),

  loginStart: action(state => {
    state.loading = true;
    state.loginError = null;
  }),

  loginSuccess: action((state, payload) => {
    const {
      accessToken: token,
      _id: userId,
      refreshToken,
      email,
      role,
    } = payload;

    state.token = token;
    state.refreshToken = refreshToken;
    state.userId = userId;
    state.email = email;
    state.role = role;
    state.loading = false;

    LocalStorage.setUser({ token, userId, refreshToken, email, role });
  }),

  loginFail: action(state => {
    state.loginError = 'Login Failed. Please try again.';
    state.loading = false;
  }),

  refreshAccessToken: thunk((action, payload, helpers) => {
    const { refreshToken } = helpers.getState();
    if (refreshToken) {
      UserApi.refreshToken({ token: refreshToken })
        .then(action.refreshCompleted)
        .catch(action.logout);
    }
  }),

  refreshCompleted: action((state, payload) => {
    const { accessToken } = payload;
    state.token = accessToken;

    LocalStorage.setUserToken(accessToken);
  }),

  logout: action(state => {
    state.token = null;
    state.refreshToken = null;
    state.userId = null;
    state.email = null;

    LocalStorage.clearUser();
  }),
};

export default UserModel;
