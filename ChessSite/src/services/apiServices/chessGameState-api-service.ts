import api from "../../api/axios";
import type { AxiosError } from "axios";
import type { GameStateDto, PossibleMovesDto,ExecuteMovementDto, GameStarterDto, PieceType, PiecePromotionDto } from "../../api/chessApi";
import toChessNotation from "../../utils/Boards";
import * as userService from "../../services/UserService/user-service";

export interface ErrorResponseDto {
  message: string;
  errorCode?: string;
  statusCode: number;
}

export type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ErrorResponseDto };

/**
 * Starts a new chess game match
 * @returns GameStateDto on success, ErrorResponseDto on failure
 */
export async function StartGame(): Promise<ApiResult<GameStateDto>> {
  try {
    const whiteId = userService.getRandomUser().id;
    const blackId = userService.getRandomUser().id;
    const gameStarter : GameStarterDto ={ whitePlayerId:whiteId ,blackPlayerId:blackId  }
    const response = await api.post<GameStateDto>('/chessgame/start-game',gameStarter);
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

/**
 * Gets the default chess board state
 * @returns GameStateDto on success, ErrorResponseDto on failure
 */
export async function getDefaultState(): Promise<ApiResult<GameStateDto>> {
  try {
    const response = await api.get<GameStateDto>('/chessgame/default-state');
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

/**
 * Gets a random chess board state
 * @returns GameStateDto on success, ErrorResponseDto on failure
 */
export async function getRandomState(): Promise<ApiResult<GameStateDto>> {
  try {
    const response = await api.get<GameStateDto>('/chessgame/random-state');
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

/**
 * Executes a chess move from one position to another
 * @param fromPos The source position in chess notation (e.g., "e2")
 * @param toPos The destination position in chess notation (e.g., "e4")
 * @returns GameStateDto on success, ErrorResponseDto on failure
 */
export async function executeMovement(fromPos: string, toPos: string): Promise<ApiResult<GameStateDto>> {
  try {
    const movementDto: ExecuteMovementDto = { 
      fromPos: fromPos, 
      toPos: toPos 
    };
    
    // Send the DTO in the request body, not in the URL
    const response = await api.post<GameStateDto>(`/chessgame/execute-move`, movementDto);
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



/**
 * Gets the possible moves of the piece on a square given its row and column
 * @returns PossibleMovesDto on success, ErrorResponseDto on failure
 */
export async function getPossibleMovesAtPosition(row:number,col:number): Promise<ApiResult<PossibleMovesDto>> {
  try {
    const chessNotationPosition = toChessNotation(row,col);
    const response = await api.get<PossibleMovesDto>(`/chessgame/possible-move/${chessNotationPosition}`);
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

/**
 * Gets the possible moves of the piece on a square given its row and column
 * @returns PossibleMovesDto on success, ErrorResponseDto on failure
 */
export async function promotePieceAtSquareToPieceOfType(square:string,piece:PieceType): Promise<ApiResult<GameStateDto>> {
  try {
    const promotionInfo : PiecePromotionDto = { promotingSquare:square , pieceToPromote:piece };
    const response = await api.post<GameStateDto>(`/chessgame/promote-piece`,promotionInfo);
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
