// 基础响应类型
export interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
  description?: string;
}

// 分页响应类型
export interface PageResponse<T = any> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

// 用户相关类型
export interface User {
  id: number;
  userName: string;
  userAccount: string;
  userAvatar?: string;
  userRole: string;
  createTime: string;
  updateTime: string;
}

export interface UserVO {
  id: number;
  userName: string;
  userAccount: string;
  userAvatar?: string;
  userRole: string;
  userRoleStr?: string;
  email?: string;
  accessKey?: string;
  secretKey?: string;
  createTime: string;
}

export interface LoginUserVO {
  id: number;
  userName: string;
  userAccount: string;
  userAvatar?: string;
  userRole: string;
  createTime: string;
}

// 登录注册请求类型
export interface UserLoginRequest {
  userAccount: string;
  userPassword: string;
}

export interface UserRegisterRequest {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
  userName: string;
  email?: string;
  captcha?: string;
}

// 题目相关类型
export interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  answer: string;
  submitNum: number;
  acceptedNum: number;
  judgeCase: JudgeCase[];
  judgeConfig: JudgeConfig;
  userId: number;
  createTime: string;
  updateTime: string;
  isDelete: number;
}

export interface QuestionVO {
  id: number;
  title: string;
  content: string;
  tags: string[];
  submitNum: number;
  acceptedNum: number;
  userId: number;
  createTime: string;
  updateTime: string;
  userVO: UserVO;
}

export interface JudgeCase {
  input: string;
  output: string;
}

export interface JudgeConfig {
  memoryLimit: number;
  stackLimit: number;
  timeLimit: number;
}

export interface JudgeInfo {
  message: string;
  memory: number;
  time: number;
}

// 题目提交相关类型
export interface QuestionSubmit {
  id: number;
  language: string;
  code: string;
  judgeInfo: JudgeInfo;
  status: number;
  questionId: number;
  userId: number;
  createTime: string;
  updateTime: string;
  isDelete: number;
}

export interface QuestionSubmitVO {
  id: number;
  language: string;
  code: string;
  judgeInfo: JudgeInfo;
  status: number;
  questionId: number;
  userId: number;
  createTime: string;
  updateTime: string;
  questionVO: QuestionVO;
}

// 接口相关类型
export interface InterfaceInfo {
  id: number;
  name: string;
  description: string;
  url: string;
  requestParam: string;
  responseBody: string;
  status: number;
  method: string;
  leftNum: number;
  userId: number;
  createTime: string;
  updateTime: string;
  isDelete: number;
}

export interface InterfaceInfoVO {
  id: number;
  name: string;
  description: string;
  url: string;
  requestHeader: string;
  responseHeader: string;
  requestParam?: string;
  responseBody?: string;
  status: number;
  method: string;
  userId: number;
  createTime: string;
  updateTime: string;
  userVO: UserVO;
  totalNum: number;
}

// 代码执行相关类型
export interface ExecuteCodeResponse {
  outputList: string[];
  judgeInfo: JudgeInfo;
  message: string;
}

// 查询请求类型
export interface QuestionQueryRequest {
  current?: number;
  pageSize?: number;
  id?: number;
  title?: string;
  content?: string;
  tags?: string[];
  userId?: number;
}

export interface InterfaceInfoQueryRequest {
  current?: number;
  pageSize?: number;
  id?: number;
  name?: string;
  status?: number;
  method?: string;
}

export interface UserQueryRequest {
  current?: number;
  pageSize?: number;
  id?: number;
  userName?: string;
  userRole?: string;
}

export interface QuestionSubmitQo {
  /**
   * 编程语言：java、python、cpp
   */
  language?: string;
  /**
   * 提交状态：0-待判题、1-判题中、2-判题成功、3-判题失败
   */
  status?: number;
  questionId?: string;
}
