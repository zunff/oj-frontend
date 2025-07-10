import request from "./request";
import type {
  BaseResponse,
  InterfaceInfo,
  InterfaceInfoVO,
  InterfaceInfoQueryRequest,
  PageResponse,
} from "./types";

// 获取接口列表
export const getInterfaceList = (
  data: InterfaceInfoQueryRequest
): Promise<BaseResponse<PageResponse<InterfaceInfoVO>>> => {
  return request.post("/interface/list/page/vo", data);
};

// 获取接口详情
export const getInterfaceById = (
  id: string
): Promise<BaseResponse<InterfaceInfo>> => {
  return request.get(`/interface/get/vo?id=${id}`);
};

// 添加接口
export const addInterface = (
  data: Partial<InterfaceInfo>
): Promise<BaseResponse<number>> => {
  return request.post("/interface/add", data);
};

// 更新接口
export const updateInterface = (
  data: Partial<InterfaceInfo>
): Promise<BaseResponse<boolean>> => {
  return request.post("/interface/update", data);
};

// 删除接口
export const deleteInterface = (id: number): Promise<BaseResponse<boolean>> => {
  return request.post("/interface/delete", { id });
};

// 发布接口
export const publishInterface = (
  id: number
): Promise<BaseResponse<boolean>> => {
  return request.post("/interface/publish", { id });
};

// 下线接口
export const offlineInterface = (
  id: number
): Promise<BaseResponse<boolean>> => {
  return request.post("/interface/offline", { id });
};

// 在线调用接口
export const invokeInterface = (data: {
  id: string;
  requestParam?: string;
}): Promise<BaseResponse<any>> => {
  return request.post("/interface/online/invoke", data);
};

// 获取接口调用次数
export const getInvokeCount = (data: {
  interfaceId: string;
}): Promise<BaseResponse<number>> => {
  return request.post("/interface/user/invoke/count", data);
};
