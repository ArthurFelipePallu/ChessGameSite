import './styles.css'
import { x8_Board , x8_defaultPossiblePositions } from '../../../utils/Boards';
import { x2_Board , x2_defaultPossiblePositions } from '../../../utils/Boards';
import ChessBoard from '../../../components/Chess/Board/index'
import type { BoardDTO } from '../../../models/Chess/BoardDTO';


const defaultBoard : BoardDTO = {
    board : x8_Board,
    possibleMoves : x8_defaultPossiblePositions,
    boardColorSchemeId : "classic"
}


export default function JogoLocal()
{
    
    return(
     <div className='cs-jogolocal-container'>
        <h1>Chess Board with Highlighted Moves</h1>
         <ChessBoard
            boardInfo={defaultBoard}
        /> 
    </div>

    
    );
}