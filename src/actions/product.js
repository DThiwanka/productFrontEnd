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
} from "./../actionTypes/product";
import { api_url } from "./../config";
const axios = require("axios");

export function createProduct(data, history) {
  return (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    axios
      .post(`${api_url}/api/product`, data)
      .then(function (res) {
        console.log("res=>", res.data);
        setTimeout(() => {
          dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: res.data,
          });
          history.push("/");
        }, 1000);
      })
      .catch(function (error) {
        const { response } = error;
        console.log("err", response);
        if (response !== undefined) {
          dispatch({
            type: CREATE_PRODUCT_FAILURE,
            payload: response.data,
          });
          alert(response.data?.message);
        }
      });
  };
}

export function getProducts() {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCT_REQUEST });
    axios
      .get(`${api_url}/api/product`)
      .then(function (res) {
        console.log("res =>", res.data);
        dispatch({
          type: GET_PRODUCT_SUCCESS,
          payload: res.data,
        });
      })
      .catch(function (error) {
        const { response } = error;
        console.log("err", response);
        if (response !== undefined) {
          dispatch({
            type: GET_PRODUCT_FAILURE,
            payload: response?.data,
          });
        }
      });
  };
}

export function getProductById(id) {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCT_BYID_REQUEST });
    axios
      .get(`${api_url}/api/product/${id}`)
      .then(function (res) {
        console.log("res =>", res.data);
        dispatch({
          type: GET_PRODUCT_BYID_SUCCESS,
          payload: res.data,
        });
      })
      .catch(function (error) {
        const { response } = error;
        console.log("err", response);
        if (response !== undefined) {
          dispatch({
            type: GET_PRODUCT_BYID_FAILURE,
            payload: response.data,
          });
        }
      });
  };
}

export function updateProductById(id, data, history) {
  return (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_BYID_REQUEST });
    axios
      .put(`${api_url}/api/product/${id}`, data)
      .then(function (res) {
        console.log("res=>", res.data);
        setTimeout(() => {
          dispatch({
            type: UPDATE_PRODUCT_BYID_SUCCESS,
            payload: res.data,
          });
          history.push("/");
        }, 1000);
      })
      .catch(function (error) {
        const { response } = error;
        console.log("err", response);
        if (response !== undefined) {
          dispatch({
            type: UPDATE_PRODUCT_BYID_FAILURE,
            payload: response.data,
          });
          alert(response.data?.message);
        }
      });
  };
}

export function deleteProductById(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_BYID_REQUEST });
    axios
      .delete(`${api_url}/api/product/${id}`)
      .then(function (res) {
        console.log("res =>", res.data);
        dispatch({
          type: DELETE_PRODUCT_BYID_SUCCESS,
          payload: id,
        });
      })
      .catch(function (error) {
        const { response } = error;
        console.log("err", response);
        if (response !== undefined) {
          dispatch({
            type: DELETE_PRODUCT_BYID_FAILURE,
            payload: response.data,
          });
          alert(response.data?.message);
        }
      });
  };
}