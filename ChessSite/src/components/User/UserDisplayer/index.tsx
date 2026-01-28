import "./styles.css"
import { getRandomInt } from "../../../utils/utils";
import type { UserDto } from "../../../models/User/UserDto";
import * as iconService from "../../../services/icon-service";
import { getUserPortraitStyle } from "../../../services/pieceSpriteSheet-service";
type Prop ={
    userInfo : UserDto;
}

export default function UserDisplayer({userInfo}:Prop)
{
    const portraitRow = getRandomInt(0,9);
    const portraitCol = getRandomInt(0,19);
    const portraitStyle = getUserPortraitStyle(portraitRow,portraitCol);
    return (
        <div className=" user-displayer-container">

            <div className="user-displayer-left-content">
                <div className="user-portrait-container">
                    <div
                        className="user-portrait"
                        style={portraitStyle}
                    />


                </div>
                <div className="user-info">
                    <div className="user-displayer-name">
                        {userInfo.name} + {iconService.getIconById(userInfo.flagIconId).icon}
                    </div>
                    <div className="user-displayer-elo">
                        Elo: {userInfo.elo}
                    </div>

                </div>
                 
            </div>
            <div className="user-displayer-right-content">
                <div className="user-displayer-clock">
                    <div> 9:50 </div>
                </div>
            </div>
           


        </div>
    );
}