import styled from "styled-components";
import { OpenWeather } from "./OpenWeather";
import { useState } from "react";

const Input=styled.div`
margin: 0 auto;
`
export function Weather(){
  const [input,setInput]=useState("");
  const [cityName,setCityName]=useState("");
  return<>
  <Input>
    <input placeholder="도시이름을 입력해주세요"
    value={input} onChange={(e)=>setInput(e.target.value)}/>
    <button onClick={()=>{setCityName(input)}}>입력</button>
  </Input>
  <OpenWeather cityName={cityName} />
  </>
}