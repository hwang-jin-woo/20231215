import "./Comp.css";

function Component1(){
  const name="Steve";
  return <>
    <h1 style={{color:"yellow",backgroundColor:"blue"}}>Component1</h1>
    <p className="text">Hello~{name}</p>
    </>
}
function Component2(){
  const name="Tom";
  return <>
    <h1>Component2</h1>
    <p className="text">Hello~{name}</p>
    </>
}
function Component3(){
  const name="Alvin";
  return <>
    <h1>Component3</h1>
    <p className="text">Hello~{name}</p>
    </>
}

export function Comp(){
  return <>
    <Component1 />
    <Component2 />
    <Component3 />
  </>
}