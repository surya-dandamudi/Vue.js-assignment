
import { createRouter, createWebHistory } from 'vue-router';
import CarList from '../components/CarList.vue';
import AddCar from '../components/AddCar.vue';


const routes = [
  {
    path: '/',
    name: 'CarList',
    component: CarList
  },
  {
    path: '/add-car',
    name: 'AddCar',
    component: AddCar
  }
];


const router = createRouter({
  history: createWebHistory(), 
  routes
});


export default router;
