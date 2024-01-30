import styled from 'styled-components';

const CheckBoxCnt = styled.div`
    input[type=checkbox] {
        display: none;
    }

    input[type=checkbox] + label {
        flex:1;
        display: inline-block;
        margin: 20px;
        font: 0.8rem 'Noto Sans KR';
        text-align: center;
        background: #f5f6f7;
        border: 1px solid #ddd;
        padding: 6px 11px;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 20px;
    }

    input[type=checkbox]:checked + label {
        background-image: none;
        background: #f3fbff;
        border: 1px solid #76d5ff;
        padding: 6px 11px;
        box-sizing: border-box;
        cursor: pointer;
        z-index: 1;
    }
`

export default CheckBoxCnt;