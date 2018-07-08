import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  address: '',
  token: ''
}

const mutations = {
  SET_ADDRESS(state, payload){
    state.address = payload
  },
  SET_TOKEN(state, payload){
    state.token = payload
  }
}

const actions = {
  setAddress({commit}, payload) {
    commit('SET_ADDRESS', payload)
  },
  setToken({commit}, payload){
    console.log(payload)
    commit('SET_TOKEN', payload)
  }
}

const getters = {
  getAddress(state){
    return state.address
  },
  getToken(state){
    return state.token
  }
}


export const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
})
