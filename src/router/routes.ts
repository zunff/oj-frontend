import { RouteRecordRaw } from "vue-router";
import AccessEnum from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户相关",
    component: () => import("../layouts/UserLayout.vue"),
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "login",
        name: "登陆",
        component: () => import("@/views/user/UserLoginView.vue"),
      },
      {
        path: "register",
        name: "注册",
        component: () => import("@/views/user/UserRegisterView.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "首页",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/question_submit",
    name: "浏览提交",
    component: () => import("@/views/question/QuestionSubmitView.vue"),
  },
  {
    path: "/view/question/:id",
    name: "做题页面",
    component: () => import("@/views/question/ViewQuestionView.vue"),
    props: true,
    meta: {
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: () => import("@/views/question/AddQuestionView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: () => import("@/views/question/AddQuestionView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: () => import("@/views/question/ManageQuestionView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/list/api",
    name: "Api开放平台",
    component: () => import("@/views/interface/ListOpenApiView.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.USER,
    },
  },
  {
    path: "/info/user/:id",
    name: "用户信息",
    props: true,
    component: () => import("@/views/user/UserInfoView.vue"),
    meta: {
      hideInMenu: true,
      access: AccessEnum.USER,
    },
  },
  {
    path: "/interface/document/:id",
    name: "接口文档",
    props: true,
    component: () => import("@/views/interface/ApiDocumentView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/interface",
    name: "添加Api接口",
    component: () => import("@/views/interface/AddInterfaceView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/interface",
    name: "更新Api接口",
    component: () => import("@/views/interface/AddInterfaceView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/404",
    name: "权限不足",
    component: () => import("@/views/NoAuthView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
];
