import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/Layout.vue";
import Blank from "@/components/Blank.vue";
import NotFound from "@/components/NotFound.vue";

import Home from "@/views/Home.vue";
import Account from "@/views/Account.vue";
import About from "@/views/About.vue";
import MyPage from "@/views/MyPage.vue";

import Design1 from "@/views/design/1.vue";
import Design2 from "@/views/design/2.vue";
import Design3 from "@/views/design/3.vue";

const routeChildren: Array<RouteRecordRaw> = [
  {
    path: "",
    component: Home,
  },
  {
    path: "about",
    component: About,
  },
  {
    path: "account",
    component: Account,
  },
  {
    path: "mypage",
    component: MyPage,
  },
  {
    path: "design/1",
    component: Design1,
  },
  {
    path: "design/2",
    component: Design2,
  },
  {
    path: "design/3",
    component: Design3,
  },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/:lang",
        component: Blank,
        children: routeChildren,
      },
      {
        path: "",
        component: Blank,
        children: routeChildren,
      },
    ],
  },
  {
    path: "/:page(.*)",
    name: "NotFoundPage",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
