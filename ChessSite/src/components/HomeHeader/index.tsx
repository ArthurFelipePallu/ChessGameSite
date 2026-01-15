import { Link } from 'react-router-dom';
import './styles.css'

export default function HomeHeader()
{
    return(
    <>
        <div>
            <nav>
                <Link to={"/"}> 
                    <h1>Chess Site</h1> 
                </Link>
            </nav>
            <div>
                <Link to={"/user/"}> 
                    <h3>User</h3> 
                </Link>
            </div>
        </div>
    </>
    );
}