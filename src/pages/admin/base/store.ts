import { createStore } from "zustand";

type Filters = {
    // @ts-ignore
    [key: keyof Conditions]: string | number;
};

export interface Conditions {
    from?: string;
    to?: string;
    freeText?: string;
}

interface IEntity {
    id: number;
}

interface Pagination {
    pageIdx: number;
    pageSize: number;
}

interface IStore<IEntity> {
    pagination: Pagination;
    filters: Filters;
    items: IEntity[];
    status: string;
    isEnd: boolean;
}

const store = createStore<IStore<IEntity>>((set, get) => ({
    filters: {} as Filters,
    pagination: { pageIdx: 0, pageSize: 10 },
    items: [],
    status: '',
    isEnd: false,
}));

function GetIsEqual(obj1: any, obj2: any) {
    for (const filter in obj1) {
        if (obj1[filter] !== obj2[filter]) return false;
    }
    return true;
}

export function setFilters(filters: Filters) {
    const current = store.getState().filters;
    const isEqual = GetIsEqual(filters, current);

    if (isEqual) return;

    store.setState((x) => ({ ...x, filters }));
}

export function setPagination(pagination: Pagination) {
    const current = store.getState().pagination;

    if (pagination.pageIdx === current.pageIdx && pagination.pageSize === current.pageSize) return;

    store.setState((x) => ({ ...x, pagination }));
}

export function setItems(items: IEntity[]) {
    store.setState((x) => ({ ...x, items }));
}

export function setSelectedItemId(selectedItemId: number) {
    function setQueryParam(id: string, selectedItemId: number) {

    }

    setQueryParam('id', selectedItemId);
}

export function setStatus(newStatus: string) {
    store.setState((x) => ({ ...x, status: newStatus }));
}

export function setIsEnd(newIsEnd: boolean) {
    store.setState((x) => ({...x, isEnd: newIsEnd}));
}