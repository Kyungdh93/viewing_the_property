import { legacy_createStore as createStore } from 'redux';
// import jsonData from './data.json';
import { ref, child, get ,set, remove, update } from "firebase/database";
import { db } from "./firebase-config";
import { FlareSharp } from '@mui/icons-material';

const FIREBASE_DB_PATH = "datas/";
const LOGIN = "LOGIN/ACCOUNT";
const THEME_CHANGE = "THEME/CHANGE";
const DATA_GET = "DATA/GET";
const MAX_COUNT = "SET/MAXCOUNT";
const TODO_INSERT = "TODO/INSERT";
const TODO_REMOVE = "TODO/REMOVE";
const TODO_UPDATE = "TODO/UPDATE";
const TODO_TOGGLE = "TODO/TOGGLE";

const FILTER_UPDATE = "FILTER/UPDATE";

const firebaseCreate = (id, title, time, info) => {
  set(ref(db, (FIREBASE_DB_PATH + id)), {
    id,
    title,
    time,
    info
  });
};

const firebaseUpdate = (id, info) => {
  update(ref(db, (FIREBASE_DB_PATH + id)), {
    info
  });
};

const firebaseDelete = (id) => {
  remove(ref(db, (FIREBASE_DB_PATH + id)));
};

export const login = (user_data) => {
  return {
    type: LOGIN,
    payload: {
      user_data: user_data
    }
  };
};

export const setAllData = (datas) => {
  return {
    type: DATA_GET,
    payload: {
      datas: datas
    }
  };
};

export const changeTheme = (theme) => {
  return {
    type: THEME_CHANGE,
    payload: {
      theme: theme
    }
  };
};

export const filterUpdate = (filterArray) => {
  return {
    type: FILTER_UPDATE,
    payload: { 
      filterArray: filterArray 
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
    "detail_address": "",
    "year_of_construction": "",
    "number_of_households": "",
    "parking": "",
    "subway": "",
    "bus": "",
    "school": "",
    "entrance_structure": "",
    "heating": "",
    "management_status": "",
    "naver_bds_url": "",
    "memo": ""
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

export const todoUpdate = (id, info) => {
  firebaseUpdate(id, info);
  return {
    type: TODO_UPDATE,
    payload: { id: id, info: info },
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
export const greaterSeoul = ["서울시", "경기도", "인천광역시"];
export const seoulCities = ["강남구", "강동구", "강서구", "강북구", "관악구", "광진구", "구로구", "금천구", "노원구", "동대문구", "도봉구", "동작구", "마포구", "서대문구", "성동구", "성북구", "서초구", "송파구", "영등포구", "용산구", "양천구", "은평구", "종로구", "중구", "중랑구"];
export const gyeonggidoCities = ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"];

const initState = {"user_data":"", "datas":{}, "maxCount":5, "theme":"dark", "filterArray":[]};

export default createStore(function(state = initState, { type, payload }){
  // console.log('state = ', state);
  // console.log('type = ', type);
  // console.log('payload = ', payload);

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
    case THEME_CHANGE:
      return {
        ...state,
        theme:payload.theme
      };
    case FILTER_UPDATE:
      return {
        ...state,
        filterArray:payload.filterArray
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
      const payload_id = payload.id;
      let infoData = {...state.datas[payload_id].info};
      Object.keys(payload.info).map((key) =>
        infoData = {...infoData, [key]:payload.info[key]}
      );
      let itemData = {...state.datas[payload_id], info:infoData};
      return {
        ...state,
        datas: {...state.datas, [payload_id]:itemData}
      };
      // return {
      //   ...state,
      //   datas: state.datas.map((todo) =>
      //     todo.id === payload.id ? { ...todo, text: payload.text } : todo
      //   ),
      // };
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