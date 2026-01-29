import './styles.css'
import TurnFenToBoard, {BooleanFenToBooleanArray} from '../../../utils/Fen';
import { useContext, useMemo, useState, useCallback } from 'react';
import ChessBoard from '../../../components/Chess/Board/index';
import type { BoardDTO } from '../../../models/Chess/Board/BoardDTO';
import { x8_defaultPossiblePositions } from '../../../utils/Boards';
import { ContextSelectedBoardConfiguration } from '../../../utils/Contexts/boardConfig-context';
import * as gameStateApiService from "../../../services/apiServices/chessGameState-api-service";
import * as userService from "../../../services/UserService/user-service";
import UserDisplayer from '../../../components/User/UserDisplayer';
import type { GameStateDto } from '../../../api/chessApi';




export default function JogoLocal()
{
    const [currentGameState,SetCurrentGameState] = useState<GameStateDto>();

    const whitePlayerInfo = userService.getUserById(currentGameState?.whitePlayerId  || 1 ); 
    const blackPlayerInfo = userService.getUserById(currentGameState?.blackPlayerId  || 2 );
    // const [currentFen, setCurrentFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    const [currentPossibleMoves, setCurrentPossibleMoves] = useState<boolean[][]>(x8_defaultPossiblePositions);
    const {contextSelectedBoardColorSchemeId,contextSelectedPiecesSpriteSheetId} = useContext(ContextSelectedBoardConfiguration);
    
    const changeBoardPossibleMoves = useCallback((possibleMovesFen: string) => {
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

    const verifyPositionIsInBoardPossibleMoves = useCallback((row:number,col:number) => {
        
        return currentPossibleMoves[row][col];
    }, [currentPossibleMoves]);


    const executeBoardMovement = async (fromSquare:string,toSquare:string) => {
        const result = await gameStateApiService.executeMovement(fromSquare, toSquare);
        if (result.success) {
            // const [boardFen] = result.data.fen.split(" ");
            // setCurrentFen(boardFen);

            console.log(result.data);
            SetCurrentGameState(result.data);            
            setCurrentPossibleMoves(x8_defaultPossiblePositions);
        } else {
            alert(`Error: ${result.error.message}`);
        }
    }




    const matchBoard = useMemo<BoardDTO>(() => {
        if (!currentGameState) return {
    
            board: TurnFenToBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"),
            possibleMoves: currentPossibleMoves,
            promotingSquare: "",
            boardColorSchemeId: contextSelectedBoardColorSchemeId,
            boardUsingPieceSpriteSheetId:contextSelectedPiecesSpriteSheetId,
            executeMove : executeBoardMovement,
            changePossibleMovesAction: changeBoardPossibleMoves,
            verifyPositionIsInPossibleMoves :verifyPositionIsInBoardPossibleMoves
        };

        return {
            board: TurnFenToBoard(currentGameState.fen),
            possibleMoves: currentPossibleMoves,
            promotingSquare:currentGameState.squareToPromote,
            boardColorSchemeId: contextSelectedBoardColorSchemeId,
            boardUsingPieceSpriteSheetId:contextSelectedPiecesSpriteSheetId,
            executeMove : executeBoardMovement,
            changePossibleMovesAction: changeBoardPossibleMoves,
            verifyPositionIsInPossibleMoves :verifyPositionIsInBoardPossibleMoves
            
        };
        }, [currentGameState, currentPossibleMoves, contextSelectedBoardColorSchemeId, contextSelectedPiecesSpriteSheetId, changeBoardPossibleMoves, verifyPositionIsInBoardPossibleMoves]
    );


    // const loadGameState = async (
    // loader: () => Promise<ApiResult<GameStateDto>>
    // ) => {
    //     const result = await loader();
    //     if (result.success) {
    //         const [boardFen] = result.data.fen.split(" ");
    //         setCurrentFen(boardFen);
    //         // Reset possible moves when loading a new game state
    //         setCurrentPossibleMoves(x8_defaultPossiblePositions);
    //     } else {
    //         console.error("Failed to load game state:", result.error.message);
    //         // You can also show a toast/notification to the user here
    //         alert(`Error: ${result.error.message}`);
    //     }
    // };




    


    return(
     <div className='cs-jogolocal-container'>
        <div className='cs-container-flex-center-center cs-jogolocal-content-container'>
            <div>
                <button onClick={() => gameStateApiService.StartGame()}>
                    Start Game
                </button>
            </div>
          
            <div className='cs-jogolocal-board-container'>
                    <UserDisplayer userInfo={blackPlayerInfo} />
                    <ChessBoard
                        boardInfo={matchBoard}
                    />
                    <UserDisplayer userInfo={whitePlayerInfo} />
            </div>
           
        </div>
        
        
    </div>      

    
    );
}