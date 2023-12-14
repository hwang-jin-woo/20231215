import styled from "styled-components"
import image from "./img.jpg"
const Bigbox1 =styled.div`
text-align: center;
color: blue;
font-size: 2.5rem;
font-weight: bold;
`

const Bigbox2=styled.div`
width: 80%;
margin: 0 auto;
display: grid;
grid-template-columns: 60% 40%;
.b1 img{
  width: 100%;
  margin-top: 15px;
}
.b2{
  font-size: 1.5rem;
  padding: 15px;
}
`
const size=2.5;
const Bigbox3=styled.div`
width:80%;
height:150px;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
gap: 10px;
img{
  width: 100%;
}
p{
  font-size: ${size}rem;
  padding: 5px;
}
`
export function Session(){
  return(
    <>
    <Bigbox1>세션</Bigbox1>
    <Bigbox2>
      <div className="b1">
        <img src="https://picsum.photos/id/35/300/200" alt="img" />
      </div>
    <div className="b2">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </div>
    </Bigbox2>
    <Bigbox3>
      <div className="smallbox1">
        <div>
        <img src={image} alt="img" />
        </div>
        <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, 
        making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia
        </p>
      </div>
      <div className="smallbox2">
        <div>
        <img src="https://picsum.photos/id/18/300/200" alt="img" />
        </div>
        <p>
        during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", 
        comes from a line in section 1.10.32.
        </p>
      </div>
      <div className="smallbox3">
        <div>
        <img src="https://picsum.photos/id/25/300/200" alt="img" />
        </div>
        <p>
        The generated Lorem Ipsum is therefore always free from repetition, injected humour, 
        or non-characteristic words etc
        </p>
      </div>
    </Bigbox3>
    </>
  )
}