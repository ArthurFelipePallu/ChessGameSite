import "./styles.css"
import {history} from '../../utils/history'
import { getIconById } from "../../services/icon-service"
import { type LinkIconDTO } from "../../models/UtilsDtos/iconDTO"

type Prop ={
    linkIconInfo : LinkIconDTO;
}

export default function LinkIcon({linkIconInfo} : Prop)
{
    function goToPath(){
        if(linkIconInfo.path != '')
            history.push(linkIconInfo.path);
    }

    return (
        <div 
            onClick={goToPath}
            className="threeD">
            {getIconById(linkIconInfo.iconId).icon}
        </div>
    );
}