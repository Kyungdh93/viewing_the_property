import CheckBoxCnt from './checkBox.styles';
import './CheckBox.css';
import { useDispatch } from 'react-redux';
import { todoUpdate } from '../store';

const CheckBoxTest = (props) => {
  const dispatch = useDispatch();

  const updateValue = (e, info) => {
    dispatch(todoUpdate(props.itemData.id, info));
  };

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
      list = [];
      break;
  };

  const checkOnlyOne = (e) => {
    if (_type === 'radio') {
      // radio
      let checkPick = document.getElementsByName('checkWrap'+props.type);
      Array.prototype.forEach.call(checkPick, function (el) {
        el.checked = false;
      });
      e.target.checked = true;
      
      const info = {...props.itemData.info, [props.type]:e.target.value};
      updateValue(e, info);
    } else {
      // checkbox
      e.target.checked = e.target.checked === true ? true : false;

      let result;
      e.target.checked === true ? result = props.itemData.info[props.type] + e.target.value : result = props.itemData.info[props.type].replaceAll(e.target.value, '');
      const info = {...props.itemData.info, [props.type]:result};
      updateValue(e, info);
    };
  };
  
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