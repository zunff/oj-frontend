import AccessEnum from "@/access/accessEnum";

const checkAccess = (loginUser: any, needAccess = AccessEnum.NOT_LOGIN) => {
  //需要权限为未登录，直接放行
  if (needAccess === AccessEnum.NOT_LOGIN) {
    return true;
  }

  //下面是需要登陆的权限判断
  const loginUserAccess = loginUser?.userRole ?? AccessEnum.NOT_LOGIN;

  if (needAccess === AccessEnum.USER) {
    if (loginUserAccess === AccessEnum.NOT_LOGIN) {
      return false;
    }
  }

  if (needAccess === AccessEnum.ADMIN) {
    if (loginUserAccess !== AccessEnum.ADMIN) {
      return false;
    }
  }

  return true;
};

export default checkAccess;
