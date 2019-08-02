/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import * as types from '../mutation-types';

// initial state
const state = {
  menus: [],
  pageMenus: [],
};

const getters = {
  menus: state => state.menus,
  pageMenus: state => state.pageMenus,
};

// actions
const actions = {
  updateMenu({ commit }, { menus }) {
    commit(types.UPDATE_MENU, { menus });
  },
  updatePageMenu({ commit }, { pageMenus }) {
    commit(types.UPDATE_PAGE_MENU, { pageMenus });
  },
};

// mutations
const mutations = {
  [types.UPDATE_MENU](state, { menus }) {
    state.menus = menus;
  },
  [types.UPDATE_PAGE_MENU](state, { pageMenus }) {
    state.pageMenus = pageMenus;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
