import { useEffect, useState } from "react"
import styled from "styled-components"

const Container=styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
const Card=styled.div`
width:500px;
height: 300px;
background: linear-gradient(90deg,lightblue,dodgerblue);
color: white;
border-radius: 10px;
display: grid;
grid-template-columns: 1fr 1fr;
`
const Icon=styled.div`
text-align: center;
img{
  width: 100%;
  margin-top: 20px;
}
`
const Weather=styled.div`
text-align: end;
padding-top: 5px;
padding-right: 30px;
`
const Temp=styled.div`
margin-top: 20px;
font-size: 5rem;
i{
  font-size: 3.5rem;
}
`
const City=styled.div`
font-size: 2.5rem;
`
const Info=styled.div`
font-size: 1.5rem;
margin-top: 30px;
`
export function OpenWeather({cityName}){
  const [icon,setIcon]=useState("");
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("");
  const [info,setInfo]=useState("");
  const API_KEY="8e203f64ca689f59137fb7c8066250ac";
  const API_KEY_NINJA="8MSVI0G0b87BTDdEhrPAdw==vbAPm5cdUxbVDCzo";
  console.log("OpenWeather",cityName);

  useEffect(()=>{
    const url_ninja=`https://api.api-ninjas.com/v1/city?name=${cityName}`;
    if(!cityName){
      navigator.geolocation.getCurrentPosition(geoOK,geoError);
    }else{fetch(url_ninja,{
      headers:{
        "X-Api-Key":API_KEY_NINJA,
      },
    }).then((response)=>{
      return response.json();//서버로부터의 응답데이터를 json형식으로 parsing함
    }).then((data)=>{
      console.log(data);
      const position ={
        coords : {
          latitude:data[0].latitude,
          longitude:data[0].longitude,
        }
      }
      geoOK(position);
    }).catch((error)=>{
      console.log("요청이 실패했습니다",error);
    })
  }
    
  },[cityName]);

  // useEffect(()=>{
  //   console.log("temp changed")
  // },[temp]);
  // useEffect(()=>{
  //   console.log("city changed")
  // },[city]);
  // useEffect(()=>{
  //   console.log("info changed")
  // },[info]);
  function geoOK(position){
    console.log("getOk called");
    const lat=(position.coords.latitude);
    const lon=(position.coords.longitude);
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    //fetch 프라미스 형태의 API호출용 함수. 리턴형이 Promise객체임
    fetch(url).then((response)=>{
      return response.json();//서버로부터의 응답데이터를 json형식으로 parsing함
    }).then((data)=>{
      console.log(data);
      setIcon(data.weather[0].icon);
      setTemp(parseInt(data.main.temp));
      setCity(data.name);
      setInfo(data.weather[0].main);
    }).catch((error)=>{
      console.log("요청이 실패했습니다",error);
    })
  }

  function geoError(){
    alert("현재 위치정보를 찾을수 없습니다.")
  }

  return<>
  <Container>
    <Card>
      <Icon>
        {
          icon ?  <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="img" />
          :null
        }
      </Icon>
      <Weather>
        <Temp>{temp} <i className="ti ti-temperature-celsius"></i></Temp>
        <City>{city}</City>
        <Info>{info}</Info>
      </Weather>
    </Card>
  </Container>
  </>
}