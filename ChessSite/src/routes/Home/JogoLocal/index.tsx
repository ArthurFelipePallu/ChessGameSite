import './styles.css'
import { x8_Board , x8_defaultPossiblePositions } from '../../../utils/Boards';
import ChessBoard from '../../../components/Chess/Board/index'
import type { BoardDTO } from '../../../models/Chess/BoardDTO';
import { ContextSelectedBoardConfiguration } from '../../../utils/Contexts/boardConfig-context';
import { useContext } from 'react';




export default function JogoLocal()
{
    const {contextSelectedBoardColorSchemeId} = useContext(ContextSelectedBoardConfiguration);
    
    const defaultBoard : BoardDTO = {
        board : x8_Board,
        possibleMoves : x8_defaultPossiblePositions,
        boardColorSchemeId : contextSelectedBoardColorSchemeId
    }

    return(
     <div className='cs-jogolocal-container'>
        <div className='cs-container-flex-center-center cs-jogolocal-content-container'>
                <div className='cs-jogolocal-board-container'>
                        <h1>Chess Board with Highlighted Moves</h1>
                        <ChessBoard
                            boardInfo={defaultBoard}
                        />
                </div>
        </div>
        
        
    </div>      

    
    );
}