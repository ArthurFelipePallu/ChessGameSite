import api from "../../api/axios";
import { AxiosError } from 'axios';
import * as userService from "../../services/UserService/user-service";
import type { ExecuteMovementDto, GameStarterDto, GameStateDto, PiecePromotionDto, PieceType, PossibleMovesDto } from '../../api/chessApi';
import toChessNotation from "../../utils/Boards";




export interface ErrorResponseDto {
  message: string;
  errorCode?: string;
  statusCode: number;
}

export type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ErrorResponseDto };



export function startGame(): Promise<ApiResult<GameStateDto>> {
  const whiteId = userService.getRandomUser().id;
  const blackId = userService.getRandomUser().id;

  const gameStarter: GameStarterDto = {
    whitePlayerId: whiteId,
    blackPlayerId: blackId
  };

  return apiRequest(() =>
    api.post<GameStateDto>(
      '/chessgame/start-game',
      gameStarter
    )
  );
}



export function getDefaultState(): Promise<ApiResult<GameStateDto>> {
  return apiRequest(() =>
    api.get<GameStateDto>('/chessgame/default-state')
  );
}

export function getRandomState(): Promise<ApiResult<GameStateDto>> {
  return apiRequest(() =>
    api.get<GameStateDto>('/chessgame/random-state')
  );
}

/**
 * Executes a chess move from one position to another
 * @param fromPos The source position in chess notation (e.g., "e2")
 * @param toPos The destination position in chess notation (e.g., "e4")
 * @returns GameStateDto on success, ErrorResponseDto on failure
 */
export function executeMovement(fromPos: string, toPos: string): Promise<ApiResult<GameStateDto>> {

    const movementDto: ExecuteMovementDto = { 
      fromPos: fromPos, 
      toPos: toPos 
    };

    return apiRequest(() =>
        api.post<GameStateDto>(
        '/chessgame/execute-move',
        movementDto
        )
    );
}



/**
 * Gets the possible moves of the piece on a square given its row and column
 * @returns PossibleMovesDto on success, ErrorResponseDto on failure
 */
export function getPossibleMovesAtPosition(row:number,col:number): Promise<ApiResult<PossibleMovesDto>> {
    const chessNotationPosition = toChessNotation(row,col);
    return apiRequest(() =>
        api.get<PossibleMovesDto>(`/chessgame/possible-move/${chessNotationPosition}`)
    );
}

/**
 * Gets the possible moves of the piece on a square given its row and column
 * @returns PossibleMovesDto on success, ErrorResponseDto on failure
 */
export function promotePieceAtSquareToPieceOfType(square:string,piece:PieceType): Promise<ApiResult<GameStateDto>> {
    const promotionInfo : PiecePromotionDto = { promotingSquare:square , pieceToPromote:piece };
    return apiRequest(() =>
        api.post<GameStateDto>(`/chessgame/promote-piece`,promotionInfo)
    );
  

}



export async function apiRequest<T>(
  request: () => Promise<{ data: T }>
): Promise<ApiResult<T>> {
  try {
    const response = await request();
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseDto>;

    if (axiosError.response?.data) {
      return {
        success: false,
        error: axiosError.response.data
      };
    }

    return {
      success: false,
      error: {
        message: axiosError.message || 'An unexpected error occurred',
        errorCode: 'NetworkError',
        statusCode: axiosError.response?.status || 500
      }
    };
  }
}