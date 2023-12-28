// initial state
import { StoreOptions } from "vuex";
import AccessEnum from "@/access/accessEnum";
import { UserControllerService } from "../../generated/user";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      //userRole设为undefined来区分用户是否已经登陆过了，登陆过以后userRole一定有值
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, user) {
      //从远程获取登陆信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AccessEnum.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, user) {
      state.loginUser = user;
    },
  },
} as StoreOptions<any>;
