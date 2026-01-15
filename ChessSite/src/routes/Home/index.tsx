import './styles.css'
import { Outlet } from "react-router-dom";
import HomeHeader from '../../components/HomeHeader';

export default function Home()
{
    return(
    <>
        <HomeHeader />
        <Outlet/>
    </>);
}