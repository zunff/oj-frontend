import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import AccessEnum from "@/access/accessEnum";
import UserLayout from "../layouts/UserLayout.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户相关",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "login",
        name: "登陆",
        component: UserLoginView,
      },
      {
        path: "register",
        name: "注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "首页",
    component: HomeView,
  },
  {
    path: "/question_submit",
    name: "浏览提交",
    component: QuestionSubmitView,
  },
  {
    path: "/view/question/:id",
    name: "做题页面",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: AccessEnum.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/404",
    name: "权限不足",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
];
