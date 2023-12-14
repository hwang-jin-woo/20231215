import { useEffect, useRef, useState } from "react"


export function MyRef(){
  console.log("렌더링");
  const [input,setInput]=useState("");
  //const [count,setCount]=useState(0);
  //useRef는 값을 저장하되 렌더링에는 관여하지 말아야하는 경우 사용!
  const count=useRef(1);
  useEffect(()=>{
    count.current=count.current+1;
  },[input]);
  return <>
    <input value={input} onChange={(e)=>setInput(e.target.value)} />
    <p>
      랜더링 횟수 :<span>{count.current}</span>
    </p>
  </>
}