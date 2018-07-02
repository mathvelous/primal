import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  address: ''
  /*loadTicket: [{
    date: '20-°5-2018',
    tel:'0123456789',
    state: '',
  }],
  user: null*/
}

const mutations = {
  SET_ADDRESS(state, payload){
    state.address = payload
  }
  /*ADD_TO_QUEUE (state, payload){
    state.loadTicket.push(payload)
  },
  SET_USER (state, payload){
    state.user = payload
  }*/
}

const actions = {
  setAddress({commit}, payload) {
    commit('SET_ADDRESS', payload)
    console.log(payload)
  },
  /*addToQueue ({commit}, payload){
    const ticket = {
      createAt: new Data(),
      tel: payload.tel,
      state: 0
    }
    commit('ADD_TO_QUEUE', ticket)
  }*/
}

const getters = {
  /*loadTicket(state){
    return (ticketid) => {
      return state.loadTickets.find((ticket) => {
        return ticket.id === tickerId
      })
    }
  }*/
  getAddress(state){
    return state.address
  }
}


export const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
})
