import './styles.css'
import TurnFenToBoard, {BooleanFenToBooleanArray} from '../../../utils/Fen';
import { useContext, useMemo, useState, useCallback } from 'react';
import type { GameStateDto } from '../../../api/chessApi';
import ChessBoard from '../../../components/Chess/Board/index';
import type { BoardDTO } from '../../../models/Chess/BoardDTO';
import { x8_defaultPossiblePositions } from '../../../utils/Boards';
import type { ApiResult } from "../../../services/apiServices/chessGameState-api-service";
import { ContextSelectedBoardConfiguration } from '../../../utils/Contexts/boardConfig-context';
import * as gameStateApiService from "../../../services/apiServices/chessGameState-api-service";


export default function JogoLocal()
{
    const [currentFen, setCurrentFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    const [currentPossibleMoves, setCurrentPossibleMoves] = useState<boolean[][]>(x8_defaultPossiblePositions);
    const {contextSelectedBoardColorSchemeId,contextSelectedPiecesSpriteSheetId} = useContext(ContextSelectedBoardConfiguration);
    
    const changePossibleMoves = useCallback((possibleMovesFen: string) => {
        try {
            // Convert the FEN string to a boolean array (8x8 board)
            const possibleMovesArray = BooleanFenToBooleanArray(possibleMovesFen, 8, 8, 'x');
            setCurrentPossibleMoves(possibleMovesArray);
        } catch (error) {
            console.error("Failed to parse possible moves FEN:", error);
            // Reset to default if parsing fails
            setCurrentPossibleMoves(x8_defaultPossiblePositions);
        }
    }, []);

    const matchBoard = useMemo<BoardDTO>(() => {
        if (!currentFen) return null as any;

        return {
            board: TurnFenToBoard(currentFen),
            possibleMoves: currentPossibleMoves,
            boardColorSchemeId: contextSelectedBoardColorSchemeId,
            boardUsingPieceSpriteSheetId:contextSelectedPiecesSpriteSheetId,
            changePossibleMovesAction: changePossibleMoves
            
        };
        }, [currentFen, 
            currentPossibleMoves, 
            contextSelectedBoardColorSchemeId, 
            contextSelectedPiecesSpriteSheetId,
            changePossibleMoves
           ]
    );


    const loadGameState = async (
    loader: () => Promise<ApiResult<GameStateDto>>
    ) => {
        const result = await loader();
        if (result.success) {
            const [boardFen] = result.data.fen.split(" ");
            setCurrentFen(boardFen);
            // Reset possible moves when loading a new game state
            setCurrentPossibleMoves(x8_defaultPossiblePositions);
        } else {
            console.error("Failed to load game state:", result.error.message);
            // You can also show a toast/notification to the user here
            alert(`Error: ${result.error.message}`);
        }
    };


    return(
     <div className='cs-jogolocal-container'>
        <div className='cs-container-flex-center-center cs-jogolocal-content-container'>
            <div>
                <button onClick={() => gameStateApiService.StartGame()}>
                    Start Game
                </button>
            </div>
            <div>
                <button onClick={() => loadGameState(gameStateApiService.getRandomState)}>
                    Random Game
                </button>
            </div>
            <div className='cs-jogolocal-board-container'>
                    <h1>Chess Board with Highlighted Moves</h1>
                    <ChessBoard
                        boardInfo={matchBoard}
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