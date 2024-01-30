import React, {useState, useEffect} from 'react';
import CheckBoxCnt from './checkBox.styles';

const CheckBoxTest = () => {
	// checkbox value
    const [ checkValue, setCheckValue ] = useState('');
    
    function checkOnlyOne(e) {
        console.log(e.target.checked);
        // alert(e.target.checked);
        // console.log('e', e);
        let checkPick = document.getElementsByName('checkWrap');
        Array.prototype.forEach.call(checkPick, function (el) {
          // console.log('el', el);
          el.checked = false;
        });
        e.target.checked = true;
        setCheckValue(e.target.defaultValue);
       
    }
    
    useEffect(() => {
        // 선택한 value 확인하기
        console.log("체크박스 value", checkValue);
    }, [checkValue])

    return (
        <CheckBoxCnt>
            <input 
            	type="checkbox"
              id="btn1" 
                name="checkWrap"
                value="0"
                onChange={(e) => checkOnlyOne(e)} 
            />
            <label htmlFor="btn1">초등학교</label>
            
            <input 
              id="btn2" 
            	type="checkbox" 
                name="checkWrap" 
                value="1"
                onChange={(e) => checkOnlyOne(e)} 
            />
            <label htmlFor="btn2">중학교</label>
            
            <input 
              id="btn3" 
            	type="checkbox" 
                name="checkWrap"
                value="2"
                onChange={(e) => checkOnlyOne(e)}
            />
            <label htmlFor="btn3">고등학교</label>
        </CheckBoxCnt>
    )
}

export default CheckBoxTest;