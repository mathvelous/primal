import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  address: '',
  token: '',
  id_order: ''
}

const mutations = {
  SET_ADDRESS(state, payload){
    state.address = payload
  },
  SET_TOKEN(state, payload){
    state.token = payload
  },
  SET_ORDER(state, payload){
    state.id_order = payload
  }
}

const actions = {
  setAddress({commit}, payload) {
    commit('SET_ADDRESS', payload)
  },
  setToken({commit}, payload){
    commit('SET_TOKEN', payload)
  },
  setOrder({commit}, payload){
    commit('SET_ORDER', payload)
  }
}

const getters = {
  getAddress(state){
    return state.address
  },
  getToken(state){
    return state.token
  },
  getOrder(state){
    return state.id_order
  }
}


export const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
})
