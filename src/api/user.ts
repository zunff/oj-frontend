import request from "./request";
import type {
  BaseResponse,
  LoginUserVO,
  User,
  UserLoginRequest,
  UserRegisterRequest,
  UserQueryRequest,
  UserVO,
  PageResponse,
} from "./types";

// 用户登录
export const userLogin = (
  data: UserLoginRequest
): Promise<BaseResponse<string>> => {
  return request.post("/user/login", data);
};

// 用户注册
export const userRegister = (
  data: UserRegisterRequest
): Promise<BaseResponse<number>> => {
  return request.post("/user/register", data);
};

// 用户登出
export const userLogout = (): Promise<BaseResponse<boolean>> => {
  return request.post("/user/logout");
};

// 获取当前登录用户信息
export const getCurrentUser = (): Promise<BaseResponse<LoginUserVO>> => {
  return request.get("/user/get/login");
};

// 获取用户列表
export const getUserList = (
  params: UserQueryRequest
): Promise<BaseResponse<PageResponse<UserVO>>> => {
  return request.get("/user/list", { params });
};

// 获取用户详情
export const getUserById = (id: string): Promise<BaseResponse<UserVO>> => {
  return request.get(`/user/get?id=${id}`);
};

// 更新用户信息
export const updateUser = (
  data: Partial<User>
): Promise<BaseResponse<boolean>> => {
  return request.post("/user/update", data);
};

// 删除用户
export const deleteUser = (id: number): Promise<BaseResponse<boolean>> => {
  return request.post("/user/delete", { id });
};

// 发送邮箱验证码
export const sendEmailCaptcha = (
  email: string
): Promise<BaseResponse<boolean>> => {
  return request.get("/user/captcha/email-captcha", { params: { email } });
};
