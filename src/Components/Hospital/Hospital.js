import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { Admin } from './Admin';
import { Mg } from './Mg';
import { Mb } from './Mb';
import { FAQ } from './FAQ';
import { Mypage } from './Mypage';
import { Sc } from './Sc';
import styled from 'styled-components';
import { BmiMeasurement } from './BmiMeasurement';
import { NearestHospital } from './NearestHospital';
import { PopularHospitals } from './PopularHospitals';
import { ReservationConfirm } from './ReservationConfirm';
import { Reservation } from './Reservation';
import { ReservationStatus} from './ReservationStatus';
import { FavoriteHospital} from './FavoriteHospital';
import { AdminUserdb } from './AdminUserdb';
import { AdminHpdb } from './AdminHpdb';


const Container = styled.div`
`
export function Hospital() {

  return <>
        <BrowserRouter>
          <Container>
            <Routes>
              <Route path="/" element={<Navbar />}>                
                <Route index element={<Home />} />
                <Route path="home" element={<Home />}></Route>
                <Route path="mg" element={<Mg />}></Route>
                <Route path="sc" element={<Sc />}></Route>
                <Route path="faq" element={<FAQ />}></Route>                 
                <Route path="bmimeasurement" element={<BmiMeasurement />}></Route>                
                <Route path="nearestHospital" element={< NearestHospital/>}></Route>                
                <Route path="popularHospitals" element={< PopularHospitals/>}></Route>                
                <Route path="reservation" element={< Reservation/>}></Route>                
                <Route path="reservationConfirm" element={< ReservationConfirm/>}></Route>                
                <Route path="reservationStatus" element={< ReservationStatus/>}></Route>                
                <Route path="favoriteHospital" element={< FavoriteHospital/>}></Route>
              </Route>                           
              <Route path="admin" element={<Admin />}></Route>                 
              <Route path="/mypage" element={<Mypage />}></Route>
              <Route path="/mb" element={<Mb />}></Route>
              <Route path="/adminuserdb" element={< AdminUserdb/>}></Route>
              <Route path="/adminhpdb" element={< AdminHpdb/>}></Route>
            </Routes>
          </Container>
        </BrowserRouter>   
  </>
}