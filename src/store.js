import { legacy_createStore as createStore } from 'redux';
// import jsonData from './data.json';
import { ref, child, get ,set, remove } from "firebase/database";
import { db } from "./firebase-config";

const FIREBASE_DB_PATH = "datas/";
const LOGIN = "LOGIN/ACCOUNT";
const DATA_GET = "DATA/GET";
const MAX_COUNT = "SET/MAXCOUNT";
const TODO_INSERT = "TODO/INSERT";
const TODO_REMOVE = "TODO/REMOVE";
const TODO_UPDATE = "TODO/UPDATE";
const TODO_TOGGLE = "TODO/TOGGLE";

const firebaseCreate = (id, title, time, info) => {
  set(ref(db, FIREBASE_DB_PATH + id), {
    id,
    title,
    time,
    info
  });
};

const firebaseDelete = (id) => {
  remove(ref(db, FIREBASE_DB_PATH + id));
};

export const login = (user_data) => {
  return {
    type: LOGIN,
    payload: {
      user_data: user_data
    }
  };
};

export const getAllData = (datas) => {
  return {
    type: DATA_GET,
    payload: {
      datas: datas
    }
  };
};

export const setMaxCount = (maxCount) => {
  return {
    type: MAX_COUNT,
    payload: {
      maxCount: maxCount
    }
  };
};

export const todoInsert = (id, title, time) => {
  const info = {
    "expected_price": "",
    "expected_rent_price": "",
    "address": "",
    "year_of_construction": "",
    "number_of_households": "",
    "parking": "",
    "subway": "",
    "bus": "",
    "school": "",
    "heating": "",
    "management_status": "",
    "naver_bds_url": ""
  };
  firebaseCreate(id, title, time, info);
  return {
    type: TODO_INSERT,
    payload: {
      id: id,
      title: title,
      time: time,
      info: info
    },
  };
};

export const todoRemove = (id) => {
  firebaseDelete(id);
  return {
    type: TODO_REMOVE,
    payload: { id: id },
  };
};

export const todoUpdate = (id, text) => {
  return {
    type: TODO_UPDATE,
    payload: { id: id, text: text },
  };
};

export const todoToggle = (id) => {
  return {
    type: TODO_TOGGLE,
    payload: { id: id },
  };
};

// jsonData["user_data"] = null;

// jsonData.maxCount = 5;
// const initState = jsonData;
const initState = {"user_data":"", "datas":{}};

export default createStore(function(state = initState, { type, payload }){
  console.log('state = ', state)
  console.log('type = ', type)
  console.log('payload = ', payload)

  switch (type) {
    case DATA_GET:
      return {
        ...state,
        datas:payload.datas
      };
    case LOGIN:
      return {
        ...state,
        user_data:payload.user_data
      };
    case MAX_COUNT:
      return {
        ...state,
        maxCount:payload.maxCount
      };
    case TODO_INSERT:
      let data = {};
      data[payload.id] = payload;
      let new_data = Object.assign(state.datas, data);
      return {
        ...state,
        datas:new_data
      };
    case TODO_REMOVE:
      delete state.datas[payload.id];
      return {
        ...state
      };
    case TODO_UPDATE:
      return {
        ...state,
        datas: state.datas.map((todo) =>
          todo.id === payload.id ? { ...todo, text: payload.text } : todo
        ),
      };
    case TODO_TOGGLE:
      return {
        ...state,
        datas: state.datas.map((todo) =>
          todo.id === payload.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    default:
      return { ...state };
  }
})