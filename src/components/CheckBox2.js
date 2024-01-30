import React, {useState, useEffect} from 'react';
import { styled } from "styled-components";

const InfoRadioBoxInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:checked + label {
    background-color: "red";
    color: "white;
  }
`;

const data = {
  "테스트1": "1",
  "테스트2": "2",
  "테스트3": "3"
}
const CheckBox2 = () => {
  return (
    <>
      {Object.keys(data).map((career) => (
        <div key={data[career]}>
          <InfoRadioBoxInput
            type="radio"
            id={career.id}
            name={data[career]}
          />
          <label htmlFor={career.id}>
            <span>{data[career]}</span>
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckBox2;