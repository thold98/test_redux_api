export interface Breed {
  id: string;
  attributes: {
    description: string;
    name: string;
    temperament?: string;
    hypoallergenic: boolean;
  };
}

export interface BreedsState {
  loading: boolean;
  breeds: Breed[];
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems?: number; // Tổng số bản ghi từ API
    itemsPerPage?: number; // Số lượng bản ghi trên mỗi trang
  };
}

export const FETCH_BREEDS_REQUEST = "FETCH_BREEDS_REQUEST";
export const FETCH_BREEDS_SUCCESS = "FETCH_BREEDS_SUCCESS";
export const FETCH_BREEDS_FAILURE = "FETCH_BREEDS_FAILURE";

interface FetchBreedsRequestAction {
  type: typeof FETCH_BREEDS_REQUEST;
}

interface FetchBreedsSuccessAction {
  type: typeof FETCH_BREEDS_SUCCESS;
  payload: Breed[];
}

interface FetchBreedsFailureAction {
  type: typeof FETCH_BREEDS_FAILURE;
  payload: string;
}

export type BreedsAction =
  | FetchBreedsRequestAction
  | FetchBreedsSuccessAction
  | FetchBreedsFailureAction;
