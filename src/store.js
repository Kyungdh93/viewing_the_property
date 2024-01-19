import { legacy_createStore as createStore } from 'redux';
import jsonData from './data.json';

const TEST = "SEARCH/TEST";
const LOGIN = "LOGIN/ACCOUNT";
const MAX_COUNT = "SET/MAXCOUNT";
const TODO_INSERT = "TODO/INSERT";
const TODO_REMOVE = "TODO/REMOVE";
const TODO_UPDATE = "TODO/UPDATE";
const TODO_TOGGLE = "TODO/TOGGLE";

export const login = (user_data) => {
  return {
    type: LOGIN,
    payload: {
      user_data: user_data
    }
  };
};

export const todoTest = (text) => {
  return {
    type: TEST,
    payload: {
      text: text
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
  return {
    type: TODO_INSERT,
    payload: {
      id: id,
      title: title,
      time: time,
    },
  };
};

export const todoRemove = (id) => {
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

jsonData.user_data = null;
jsonData.maxCount = 5;
jsonData.search_data = "";
const initState = jsonData;

export default createStore(function(state = initState, { type, payload }){
  // console.log('state = ', state)
  // console.log('type = ', type)
  // console.log('payload = ', payload)

  switch (type) {
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
    case TEST:
      return {
        ...state,
        search_data:payload.text
      };
    case TODO_INSERT:
      return {
        ...state,
        datas: state.datas.concat({
          id: payload.id,
          title: payload.title,
          time: payload.time
        }),
      };
    case TODO_REMOVE:
      return {
        ...state,
        datas: state.datas.filter((todo) => todo.id !== payload.id),
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