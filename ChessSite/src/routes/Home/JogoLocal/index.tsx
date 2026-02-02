import './styles.css'
import TurnFenToBoard, {BooleanFenToBooleanArray} from '../../../utils/Fen';
import { useContext, useMemo, useState, useCallback, useEffect } from 'react';
import ChessBoard from '../../../components/Chess/Board/index';
import type { BoardDTO } from '../../../models/Chess/Board/BoardDTO';
import { x8_defaultFenString,x8_defaultPossiblePositionsFenString } from '../../../utils/Boards';
import { ContextSelectedBoardConfiguration } from '../../../utils/Contexts/boardConfig-context';
import * as gameStateApiServices from "../../../services/apiServices/chess-api-service";
import * as userService from "../../../services/UserService/user-service";
import UserDisplayer from '../../../components/User/UserDisplayer';
import { MatchResult, type GameStateDto, type PieceType } from '../../../api/chessApi';




export default function JogoLocal()
{

    const [gameStarted,setGameStarted] = useState<boolean>(false);

    const defaultPossiblePosArray = BooleanFenToBooleanArray(x8_defaultPossiblePositionsFenString,8,8,'x');


    const [currentGameState,SetCurrentGameState] = useState<GameStateDto>();
    const whitePlayerInfo = userService.getUserById(currentGameState?.whitePlayerId  || 1 ); 
    const blackPlayerInfo = userService.getUserById(currentGameState?.blackPlayerId  || 2 );
    // const [currentFen, setCurrentFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    const [currentPossibleMoves, setCurrentPossibleMoves] = useState<boolean[][]>(defaultPossiblePosArray);
    const {contextSelectedBoardColorSchemeId,contextSelectedPiecesSpriteSheetId} = useContext(ContextSelectedBoardConfiguration);
    

    useEffect( () => {
        if(!gameStarted)
        {
            gameStateApiServices.startGame();
            setGameStarted(true);
        }
    }, [gameStarted]);


    const changeBoardPossibleMoves = useCallback((possibleMovesFen: string) => {
        try {
            // Convert the FEN string to a boolean array (8x8 board)
            const possibleMovesArray = BooleanFenToBooleanArray(possibleMovesFen, 8, 8, 'x');
            setCurrentPossibleMoves(possibleMovesArray);
        } catch (error) {
            console.error("Failed to parse possible moves FEN:", error);
            // Reset to default if parsing fails
            setCurrentPossibleMoves(defaultPossiblePosArray);
        }
    }, [defaultPossiblePosArray]);

    const verifyPositionIsInBoardPossibleMoves = useCallback((row:number,col:number) => {
        
        return currentPossibleMoves[row][col];
    }, [currentPossibleMoves]);


    const executeBoardMovement = useCallback(async (fromSquare: string, toSquare: string) => {
            const result = await gameStateApiServices.executeMovement(fromSquare, toSquare);

            if (result.success) {
            console.log(result.data);
            SetCurrentGameState(result.data);
            setCurrentPossibleMoves(defaultPossiblePosArray);
            } else {
            alert(`Error: ${result.error.message}`);
            }
        },
        [defaultPossiblePosArray] // add anything used from outside
    );

    const promotePieceAtSquareToPieceOfType = useCallback(async (square:string , piece : PieceType) =>
    {
         const result = await gameStateApiServices.promotePieceAtSquareToPieceOfType(square, piece);
        if (result.success) {
            // const [boardFen] = result.data.fen.split(" ");
            // setCurrentFen(boardFen);

            console.log(result.data);
            SetCurrentGameState(result.data);            
            setCurrentPossibleMoves(defaultPossiblePosArray);
        } else {
            alert(`Error: ${result.error.message}`);
        }
        },
        [defaultPossiblePosArray]
    );


    const matchBoard = useMemo<BoardDTO>(() => {
        return {
            
            board: TurnFenToBoard(currentGameState?.fen ?? x8_defaultFenString),
            possibleMoves: currentPossibleMoves,
            promotingSquare:currentGameState?.squareToPromote ?? "",
            boardColorSchemeId: contextSelectedBoardColorSchemeId,
            boardUsingPieceSpriteSheetId:contextSelectedPiecesSpriteSheetId,
            executeMove : executeBoardMovement,
            changePossibleMovesAction: changeBoardPossibleMoves,
            verifyPositionIsInPossibleMoves :verifyPositionIsInBoardPossibleMoves,
            promotePieceFromSquareToPiece:promotePieceAtSquareToPieceOfType
            
        };
        },  [
                currentGameState,
                currentPossibleMoves,
                contextSelectedBoardColorSchemeId,
                contextSelectedPiecesSpriteSheetId,
                executeBoardMovement,
                changeBoardPossibleMoves,
                verifyPositionIsInBoardPossibleMoves,
                promotePieceAtSquareToPieceOfType,
            ]
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
     <div className='cs-local-game-container'>
        <div className=' cs-local-game-content-container'>
            {/* <div>
                <button onClick={() => gameStateApiServices.startGame()}>
                    Start Game
                </button>
            </div>
           */}
            <div className='cs-local-game-board-container'>
                
                <div className={`cs-local-game-result ${ currentGameState?.result != MatchResult.NotDefined ? 'appear':'' }`}> {currentGameState?.result} </div>

                {/* {currentGameState?.result != MatchResult.NotDefined && (
                )} */}
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