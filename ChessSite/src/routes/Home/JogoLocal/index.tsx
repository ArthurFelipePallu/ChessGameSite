import './styles.css'
import { x8_Board , x8_defaultPossiblePositions } from '../../../utils/Boards';
import { x2_Board , x2_defaultPossiblePositions } from '../../../utils/Boards';
import ChessBoard from '../../../components/Chess/Board/index'
import { defaultColorScheme } from '../../../utils/BoardColorSchemes';


export default function JogoLocal()
{
    
    return(
     <div className='cs-jogolocal-container'>
        <h1>Chess Board with Highlighted Moves</h1>
         <ChessBoard
            board={x8_Board}
            possibleMoves={x8_defaultPossiblePositions}
            BoardColorScheme={defaultColorScheme}
        /> 
    </div>

    
    );
}