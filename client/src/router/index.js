import Vue from 'vue'
import VueRouter from 'vue-router'

// This fix for error handling when re direct to the same view route which we are currently on
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


Vue.use(VueRouter)

  const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "favorites" */ '../views/FavoritesPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
