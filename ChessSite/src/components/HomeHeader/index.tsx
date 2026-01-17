import { Link } from 'react-router-dom';
import './styles.css'

export default function HomeHeader()
{
    return(
        <header className="cs-container-flex-between-center  cs-home-header ">
            <nav className="cs-container-flex-between-center  cs-header-info-container">

                <Link to={"/"}> 
                    <h1>Chess Site</h1> 
                </Link>

                <div>
                <Link to={"/user/"}> 
                    <h3>User</h3> 
                </Link>
            </div>
            </nav>
            
        </header>
    );
}