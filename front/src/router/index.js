import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from '@/components/Home'
import What from '@/components/What'
import Contact from '@/components/Contact'
import Account from '@/components/Account'
import Cart from '@/components/Cart'
import Order from '@/components/Order'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Payment from '@/components/Payment'
import Delivery from '@/components/Delivery'


Vue.use(Router)

export default new Router({
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
      path: '/order',
      name: 'Order',
      component: Order
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
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery
    }

  ]
})
