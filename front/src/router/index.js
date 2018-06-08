import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from '@/components/Home'
import What from '@/components/What'
import Shipping from '@/components/Shipping'
import Contact from '@/components/Contact'
import Account from '@/components/Account'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/what',
      name: 'What',
      component: What
    },
    {
      path: '/shipping',
      name: 'Shipping',
      component: Shipping
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }

  ]
})
