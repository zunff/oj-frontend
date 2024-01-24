/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InterfaceInfo } from './InterfaceInfo';
import type { OrderItem } from './OrderItem';

export type Page_InterfaceInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<InterfaceInfo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
