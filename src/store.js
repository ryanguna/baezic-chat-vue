import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store ({
  state: {
    users : [],
    messages : [],
    current_user : []
  },
  mutations: {
    SOCKET_CONNECT: (state,  status ) => {
     console.log('CONNECTED !');
    },
    SOCKET_MESSAGE : (state, payload) => {
      console.log('i received a new message', payload);
    },
    SOCKET_DISCONNECT: (state,  status ) => {
      console.log('DISCONNECTED!! !');
    },
    UPDATE_PUBLIC_MESSAGES : (state,  payload ) => {
      state.messages.push(payload);
    },
    UPDATE_LIST_OF_USERS : (state, payload) => {
      state.users = payload;
    },
    UPDATE_CURRENT_USER : (state, payload) => {
      state.current_user = payload;
    },
    POPULATE_MAIN_SCREEN : (state, payload) => {
      state.messages = payload[0]
    },
    ALL_MESSAGES : (state, payload) => {
      state.messages = payload;
    }
  },
  actions: {
    socket_updatePublicMessages:({commit}, payload) => {
      commit('UPDATE_PUBLIC_MESSAGES', payload);
    },
    socket_updateCurrentUser :({commit}, payload) => {
      commit('UPDATE_CURRENT_USER', payload);
    },
    socket_listOfUsers : ({commit}, payload) => {
      commit('UPDATE_LIST_OF_USERS', payload);
    },
    socket_allMessages : ({commit}, payload) => {
      commit('ALL_MESSAGES', payload);
    }

  },
  getters: {

  }
});
