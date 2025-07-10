import request from "./request";
import type {
  BaseResponse,
  Question,
  QuestionVO,
  QuestionQueryRequest,
  QuestionSubmitVO,
  ExecuteCodeResponse,
  PageResponse,
  QuestionSubmitQo,
} from "./types";

// 获取题目列表
export const getQuestionList = (
  data: Partial<QuestionQueryRequest>
): Promise<BaseResponse<PageResponse<QuestionVO>>> => {
  return request.post("/question/list/page/vo", data);
};

// 获取题目详情
export const getQuestionById = (
  id: string
): Promise<BaseResponse<Question>> => {
  return request.get(`/question/get/vo?id=${id}`);
};

// 添加题目
export const addQuestion = (
  data: Partial<Question>
): Promise<BaseResponse<number>> => {
  return request.post("/question/add", data);
};

// 更新题目
export const updateQuestion = (
  data: Partial<Question>
): Promise<BaseResponse<boolean>> => {
  return request.post("/question/update", data);
};

// 删除题目
export const deleteQuestion = (id: number): Promise<BaseResponse<boolean>> => {
  return request.post("/question/delete", { id });
};

// 提交题目
export const submitQuestion = (data: {
  language: string;
  code: string;
  questionId: number;
}): Promise<BaseResponse<number>> => {
  return request.post("/question/submit/do", data);
};

// 获取提交记录
export const getSubmitList = (
  data: Partial<QuestionSubmitQo>
): Promise<BaseResponse<PageResponse<QuestionSubmitVO>>> => {
  return request.post("/question/submit/list/page/vo", data);
};

// 获取提交详情
export const getSubmitById = (
  id: number
): Promise<BaseResponse<QuestionSubmitVO>> => {
  return request.get(`/question/question_submit/get/${id}`);
};

// 执行代码
export const executeCode = (data: {
  code: string;
  language: string;
  input: string;
}): Promise<BaseResponse<ExecuteCodeResponse>> => {
  return request.post("/question/execute", data);
};
