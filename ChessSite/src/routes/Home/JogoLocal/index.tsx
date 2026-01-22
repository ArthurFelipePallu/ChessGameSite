import './styles.css'
import { useContext, useMemo, useState } from 'react';
import TurnFenToBoard from '../../../utils/Fen';
import ChessBoard from '../../../components/Chess/Board/index'
import type { BoardDTO } from '../../../models/Chess/BoardDTO';
import { x8_defaultPossiblePositions } from '../../../utils/Boards';
import { ContextSelectedBoardConfiguration } from '../../../utils/Contexts/boardConfig-context';
import * as gameStateApiService from "../../../services/apiServices/chessGameState-api-service";
import type { GameStateDTO } from '../../../models/Chess/GameStateDTO';




export default function JogoLocal()
{
    const [currentFen, setCurrentFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    const {contextSelectedBoardColorSchemeId} = useContext(ContextSelectedBoardConfiguration);
    
    const defaultBoard = useMemo<BoardDTO>(() => {
        if (!currentFen) return null as any;

        return {
            board: TurnFenToBoard(currentFen),
            possibleMoves: x8_defaultPossiblePositions,
            boardColorSchemeId: contextSelectedBoardColorSchemeId
        };
        }, [currentFen, contextSelectedBoardColorSchemeId]
    );


    const loadGameState = async (
    loader: () => Promise<GameStateDTO>
    ) => {
    try {
        const state = await loader();
        const [boardFen] = state.fen.split(" ");
        setCurrentFen(boardFen);
    } catch (err) {
        console.error("Failed to load game state", err);
    }
    };


    return(
     <div className='cs-jogolocal-container'>
        <div className='cs-container-flex-center-center cs-jogolocal-content-container'>
            <div>
                <button onClick={() => loadGameState(gameStateApiService.getRandomState)}>
                    Random Game
                </button>
            </div>
            <div className='cs-jogolocal-board-container'>
                    <h1>Chess Board with Highlighted Moves</h1>
                    <ChessBoard
                        boardInfo={defaultBoard}
                    />
            </div>
            <div>
                <button onClick={() => loadGameState(gameStateApiService.getDefaultState)}>
                    Default Game
                </button>
            </div>

        </div>
        
        
    </div>      

    
    );
}