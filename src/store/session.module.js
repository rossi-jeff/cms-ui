const sessionKey = "cms-ui-session";
const current = JSON.parse(localStorage.getItem(sessionKey));
const blank = {
  Token: null,
  UUID: null,
  SignedIn: false,
};
const initialState = current || blank;

export const session = {
  namespaced: true,
  state: initialState,
  actions: {
    loginSuccess({ commit }, payload) {
      commit("loginSuccess", payload);
    },
    loginFailure({ commit }) {
      commit("clear");
    },
    logout({ commit }) {
      commit("clear");
    },
  },
  mutations: {
    loginSuccess(state, payload) {
      state.UUID = payload.UUID;
      state.Token = payload.Token;
      state.SignedIn = true;
      localStorage.setItem(sessionKey, JSON.stringify(state));
    },
    clear(state) {
      state.UUID = null;
      state.Token = null;
      state.SignedIn = false;
      localStorage.removeItem(sessionKey);
    },
  },
};
