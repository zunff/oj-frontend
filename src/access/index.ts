import checkAccess from "@/access/checkAccess";
import router from "@/router";
import AccessEnum from "@/access/accessEnum";

router.beforeEach(async (to, from, next) => {
  // 判断是否登陆
  let loginUser = undefined;
  const userInfoStr = localStorage.getItem("user_login_info");
  if (userInfoStr) {
    try {
      loginUser = JSON.parse(userInfoStr);
    } catch (e) {
      loginUser = undefined;
    }
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
