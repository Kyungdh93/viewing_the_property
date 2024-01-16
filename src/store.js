import { legacy_createStore as createStore } from 'redux';
import jsonData from './data.json';

const TEST = "SEARCH/TEST";
const TODO_INSERT = "TODO/INSERT";
const TODO_REMOVE = "TODO/REMOVE";
const TODO_UPDATE = "TODO/UPDATE";
const TODO_TOGGLE = "TODO/TOGGLE";

export const todoTest = (text) => {
  return {
    type: TEST,
    payload: {
      text: text
    }
  };
};

export const todoInsert = (id, title, sub_title) => {
  return {
    type: TODO_INSERT,
    payload: {
      id: id,
      title: title,
      sub_title: sub_title,
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

jsonData.search_data = ""
const initState = jsonData

export default createStore(function(state = initState, { type, payload }){
  console.log('state = ', state)
  console.log('type = ', type)
  console.log('payload = ', payload)

  switch (type) {
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
          sub_title: payload.sub_title
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