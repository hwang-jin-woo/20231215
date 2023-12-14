//import { Comp } from "./Components/1005/Comp"
import { createGlobalStyle } from "styled-components"
// import { GameShop } from "./Components/GameShop/GameShop";
//import { MovieShop } from "./Components/MovieShop/MovieShop";
import { Hospital } from "./Components/Hospital/Hospital";
//import { Test } from "./Components/Test";
// import { List } from "./Components/1006/List"
// import { Avatar } from "./Components/1006/Avatar"
//import { Session } from "./Components/1005/Session"
//import { Event } from "./Components/1006/Event"
// import { AvatarList } from "./Components/1006/AvatarList";
// import { Counter } from "./Components/1010/Counter";
// import { ItemList } from "./Components/1010/ItemList";
// import { Gallery } from "./Components/1010/Gallery";
//import { OpenWeather } from "./Components/1010/OpenWeather";
//import { Weather } from "./Components/1010/Weather";
// import { MyRef } from "./Components/1010/MyRef";
// import { Home } from "./Components/1011/Home";
// import { MyRouter } from "./Components/1011/MyRouter";
// import { MyContext } from "./Components/1011/MyContext";
// import { Modal } from "./Components/1011/Modal";
// import { MyRouter } from "./Components/1011/MyRouter";
// import { SlideBox } from "./Components/1011/SlideBox";




const GlobalStyle=createGlobalStyle`
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Poppins,GmarketSansMedium;
}
`

export default function App() {
  // const isAvatar=true;
  return<>
    <GlobalStyle />
    {
      //  isAvatar ? <AvatarList />
      //  : <List />
    // <Weather/>
    // <MyRef />
    // <SlideBox />
    < Hospital/>
    //<Test />

    //< Category />
    }
    </>
} 

