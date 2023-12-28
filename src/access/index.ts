import checkAccess from "@/access/checkAccess";
import router from "@/router";
import store from "@/store";
import AccessEnum from "@/access/accessEnum";

router.beforeEach(async (to, from, next) => {
  //判断是否登陆
  let loginUser = store.state.user.loginUser;
  //之前已经登陆过了，每次请求都去后端重新获取用户信息
  if (!loginUser || !loginUser.userRole) {
    //加async 与await 表示这个请求为同步请求，请求成功后，再去执行下面的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }

  const needAccess = to.meta?.access ?? AccessEnum.NOT_LOGIN;

  if (!checkAccess(loginUser, needAccess as string)) {
    //如果鉴权失败
    if (needAccess !== AccessEnum.NOT_LOGIN) {
      //判断是不是因为没有登陆，导致鉴权失败
      next("/user/login");
      return;
    }

    if (needAccess === AccessEnum.ADMIN) {
      //判断是不是因为需要管理员权限，导致鉴权失败
      //如果是，跳转到404
      next("/404");
      return;
    }
  }
  next();
});
