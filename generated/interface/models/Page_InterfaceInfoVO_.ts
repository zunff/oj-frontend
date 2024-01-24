/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InterfaceInfoVO } from './InterfaceInfoVO';
import type { OrderItem } from './OrderItem';

export type Page_InterfaceInfoVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<InterfaceInfoVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
