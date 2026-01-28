import './styles.css'
import LinkIcon from '../LinkIcon';
import { Link } from 'react-router-dom';
import type { LinkIconDTO } from '../../models/UtilsDtos/iconDTO';


const logalGameLinkIcon : LinkIconDTO = {
    iconId: "local-game",
    path: "/jogo-local"
}
const configLinkIcon : LinkIconDTO = {
    iconId: "settings",
    path: "/configuracao"
}
const loginLinkIcon : LinkIconDTO = {
    iconId: "user",
    path: "/user/"
}


export default function HomeHeader()
{
    return(
        <header className="cs-container-flex-between-center  cs-home-header ">
            <nav className="cs-container-flex-between-center  cs-header-info-container">

                <Link to={"/"}> 
                    <h1>Chess Site</h1> 
                </Link>

                
                <div className="cs-container-flex-between-center  cs-header-icons-container">
                    <LinkIcon linkIconInfo={logalGameLinkIcon} />
                    <LinkIcon linkIconInfo={configLinkIcon} />
                    <LinkIcon linkIconInfo={loginLinkIcon} />
                </div>
            </nav>
            
        </header>
    );
}