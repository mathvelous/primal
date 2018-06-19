import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
   count: 0

  /*loadTicket: [{
    date: '20-°5-2018',
    tel:'0123456789',
    state: '',
  }],
  user: null*/
}

const mutations = {
  /*ADD_TO_QUEUE (state, payload){
    state.loadTicket.push(payload)
  },
  SET_USER (state, payload){
    state.user = payload
  }*/
}

const actions = {
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
  count(state){
    return state.count
  }
}


export const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
})
