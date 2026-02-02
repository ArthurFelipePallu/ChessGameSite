import { Outlet } from 'react-router-dom';
import HomeHeader from '../../components/HomeHeader';
import UnderConstruction from '../../components/UnderConstruction'
import './styles.css'

export default function User()
{
        return(
        <>
            <HomeHeader />
            <UnderConstruction/>
            <Outlet/>
        </>);
}