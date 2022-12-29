import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_BYID_REQUEST,
  GET_PRODUCT_BYID_SUCCESS,
  GET_PRODUCT_BYID_FAILURE,
  UPDATE_PRODUCT_BYID_REQUEST,
  UPDATE_PRODUCT_BYID_SUCCESS,
  UPDATE_PRODUCT_BYID_FAILURE,
  DELETE_PRODUCT_BYID_REQUEST,
  DELETE_PRODUCT_BYID_SUCCESS,
  DELETE_PRODUCT_BYID_FAILURE,
} from "../actionTypes/product";
const initialState = {
  loading: false,
  item: "",
  items: [],
  error: "",
};
export function products(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case GET_PRODUCT_REQUEST:
      return {
        ...state,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        items: action.payload?.response,
      };
    case GET_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PRODUCT_BYID_REQUEST:
      return {
        ...state,
      };
    case GET_PRODUCT_BYID_SUCCESS:
      return {
        ...state,
        item: action.payload?.response,
      };
    case GET_PRODUCT_BYID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_PRODUCT_BYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_BYID_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PRODUCT_BYID_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case DELETE_PRODUCT_BYID_REQUEST:
      return {
        ...state,
        items: state.items.map((res) =>
          res._id === action.payload ? { ...res, loading: true } : res
        ),
        loading: true,
      };
    case DELETE_PRODUCT_BYID_SUCCESS:
      return {
        ...state,
        items: state.items.filter((res) => res._id !== action.payload),
        loading: false,
      };
    case DELETE_PRODUCT_BYID_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
