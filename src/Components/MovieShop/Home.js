import { useQuery } from "react-query";
import { getMoviesNowPlaying,getMoviesPopular,getMoviesTopRated,getMoviesUpcoming } from "./api";


export function Home(){
  const {data:NowPlayingData,isLoading:isLoading1}=useQuery(["movies","NowPlaying"],getMoviesNowPlaying);
  const {data:topRatedData,isLoading:isLoading2}=useQuery(["movies","TopRated"],getMoviesTopRated);
  if(!isLoading1&&isLoading2){
    console.log(NowPlayingData);
    console.log(topRatedData);
  }
  return<>
    <h1>영화정보를 제공하는 웹페이지입니다.</h1>
  </>
}