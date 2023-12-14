import { useState } from "react";

export function ItemList(){
  console.log("ItemList component called");
  const[newItem,setNewItem] =useState("");
  const [items,setItems]=useState([]);
  function onChange(e){
    setNewItem(e.target.value);
  }
  function addItem(){
    //배열형태의 state를 수정할때는 새로운 임시배열을 만들고 
    //그 임시배열을 기존 상태값에 overwrite해야함
    const temp=[...items,newItem];
    setItems(temp);
    setNewItem("");//저장한다음에는 input창을 clear해줌
  }
  return<>
  <input placeholder="물품이름을 입력하세요"
  onChange={onChange}
  value={newItem} />
  <button onClick={addItem}>물품추가</button>
  <h3>물품목록</h3>
  <ul>
    {
      items.map((item,index)=>(
        <li key={index}>{item}</li>
      ))
    }
  </ul>
  </>
}