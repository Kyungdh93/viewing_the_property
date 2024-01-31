import React, {useState, useEffect} from 'react';
import CheckBoxCnt from './checkBox.styles';
import './Test.css';

const CheckBoxTest = (props) => {
  // console.log('props.type = ', props.type);
  // console.log('props.data = ', props.data);
  const [checkValue, setCheckValue ] = useState('0');

  let list;
  let _type = 'radio';
  switch (props.type) {
    case "school":
      list = schoolData;
      _type = 'checkbox';
      break;
    case "housing_type":
      list = housingTypeData;
      break;
    case "heating":
      list = heatingData;
      break;
    case "entrance_structure":
      list = entranceStructureData;
      break;
    case "management_status":
      list = managementStatusData;
      break;
    case "underground_parking":
      list = undergroundParkingData;
      break;
    default:
      break;
  };

  const checkOnlyOne = (e) => {
    if (_type === 'radio') {
      let checkPick = document.getElementsByName('checkWrap'+props.type);
      Array.prototype.forEach.call(checkPick, function (el) {
        el.checked = false;
      });
      e.target.checked = true;
    } else {
      e.target.checked = e.target.checked === true ? true : false; 
    }
    setCheckValue(e.target.defaultValue);
  };
  
  useEffect(() => {
    console.log("체크박스 value", checkValue);
  }, [checkValue]);

  return (
    <div class="flex-container space-between">
      {list.map((data, index) => (
        <CheckBoxCnt>
          <input 
            type="checkbox"
            id={"btn"+data} 
            name={"checkWrap"+props.type}
            value={index}
            defaultChecked={props.data.includes(index) ? true : false}
            onChange={(e) => checkOnlyOne(e)} 
          />
          <label htmlFor={"btn"+data}>{data}</label>
        </CheckBoxCnt>
      ))}
    </div>
  )
}

export default CheckBoxTest;

const housingTypeData = ["아파트", "오피스텔", "빌라", "주택"];
const schoolData = ["초등학교", "중학교", "고등학교"];
const heatingData = ["지역난방", "개별난방", "중앙난방"];
const entranceStructureData = ["계단식", "복도식", "복합식"];
const managementStatusData = ["나쁨", "보통", "좋음"];
const undergroundParkingData = ["연결", "연결안됨", "없음"];