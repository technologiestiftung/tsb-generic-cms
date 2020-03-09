import Store from 'store';

const STORAGE_KEYS = {
  UserId: 'tsbcms-user-id',
  UserToken: 'tsbcms-user-token',
  UserRefreshToken: 'tsbcms-user-refreshtoken',
  UserEmail: 'tsbcms-user-email',
  UserRole: 'tsbcms-user-role',
};

const clear = () => {
  Store.remove(STORAGE_KEYS.UserEmail);
  Store.remove(STORAGE_KEYS.UserToken);
  Store.remove(STORAGE_KEYS.UserId);
};

const getUserId = () => {
  return Store.get(STORAGE_KEYS.UserId);
};

const setUserId = userId => {
  return Store.set(STORAGE_KEYS.UserId, userId);
};

const getUserToken = () => {
  return Store.get(STORAGE_KEYS.UserToken);
};

const setUserToken = userToken => {
  return Store.set(STORAGE_KEYS.UserToken, userToken);
};

const getUserRefreshToken = () => {
  return Store.get(STORAGE_KEYS.UserRefreshToken);
};

const setUserRefreshToken = userRefreshToken => {
  return Store.set(STORAGE_KEYS.UserRefreshToken, userRefreshToken);
};

const getUserEmail = () => {
  return Store.get(STORAGE_KEYS.UserEmail);
};

const setUserEmail = userEmail => {
  return Store.set(STORAGE_KEYS.UserEmail, userEmail);
};

const getUserRole = () => {
  return Store.get(STORAGE_KEYS.UserRole);
};

const setUserRole = userRole => {
  return Store.set(STORAGE_KEYS.UserRole, userRole);
};

const setUser = ({ email, token, refreshToken, userId, role }) => {
  setUserId(userId);
  setUserEmail(email);
  setUserToken(token);
  setUserRefreshToken(refreshToken);
  setUserRole(role);
};

const clearUser = () => {
  Store.remove(STORAGE_KEYS.UserId);
  Store.remove(STORAGE_KEYS.UserToken);
  Store.remove(STORAGE_KEYS.UserRefreshToken);
  Store.remove(STORAGE_KEYS.UserEmail);
  Store.remove(STORAGE_KEYS.UserRole);
};

export default {
  clear,
  getUserId,
  setUserId,
  getUserToken,
  setUserToken,
  getUserRefreshToken,
  setUserRefreshToken,
  getUserEmail,
  setUserEmail,
  getUserRole,
  setUserRole,
  setUser,
  clearUser,
};
