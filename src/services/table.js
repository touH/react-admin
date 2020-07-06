import { basePost } from '@/utils/request'

export const request_dynamicTableData = data => basePost('/table/dynamic-table/getTableData', data);

export const request_pageTableData = data => basePost('/table/page-table/getTableData', data);

export const request_scrollTableData = data => basePost('/table/scroll-table/getTableData', data);
