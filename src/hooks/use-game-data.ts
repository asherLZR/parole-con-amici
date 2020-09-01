import { useEffect } from 'react';
import {
	getIsPendingLoad,
	getBoard,
	getGameData,
	getIsPendingSave,
} from '../store/game-data/reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleGetGameData,
	handleResetGameData,
} from '../store/game-data/actions';
import { GameData, BoardCoords, PlacedTile } from '../types/GameTypes';
import { Maybe } from '../types/UtilityTypes';
import { getMovingTiles } from '../store/active-game';
import { calculateMoveScore } from '../lib/calculate-move-score';
import { isValidNewMove } from '../lib/is-valid-new-move';

export const getCurrentTurnOrder = (gameData: Maybe<GameData>): number => {
	if (gameData) {
		const { turns, gamePlayerIds } = gameData;
		const numberOfPlayers = gamePlayerIds.length;
		return turns % numberOfPlayers;
	}
	return -1;
};

const getTilesFromCoords = (
	tilesCoords: BoardCoords[],
	board?: Maybe<PlacedTile>[][]
): PlacedTile[] => {
	if (board) {
		return tilesCoords.flatMap(coord => {
			const tile = board[coord.row][coord.col];
			return tile ? [tile] : [];
		});
	}
	return [];
};

export const useDispatchGameData = (gameId: string) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(handleGetGameData(gameId));
		return () => {
			dispatch(handleResetGameData());
		};
	}, [dispatch, gameId]);
};

interface useGameData {
	isPendingLoad: boolean;
	isPendingSave: boolean;
	board?: Maybe<PlacedTile>[][];
	gameData?: GameData;
	isPlayersTurn: boolean;
	movingTiles: PlacedTile[];
	isValidMove: boolean;
	moveScore?: number;
}

export const useGameData = (): useGameData => {
	const gameData = useSelector(getGameData);
	const board = useSelector(getBoard);
	const movingTilesCoords = useSelector(getMovingTiles);

	const isFirstMove = gameData?.turns === 0;

	const isValidMove = board
		? isValidNewMove(isFirstMove, board, movingTilesCoords)
		: false;

	const moveScore =
		isValidMove && board && gameData
			? calculateMoveScore(
					isFirstMove,
					movingTilesCoords,
					board,
					gameData.language
			  )
			: undefined;

	return {
		isPendingLoad: useSelector(getIsPendingLoad),
		isPendingSave: useSelector(getIsPendingSave),
		board,
		gameData,
		isPlayersTurn: getCurrentTurnOrder(gameData) === gameData?.turnOrder,
		movingTiles: getTilesFromCoords(movingTilesCoords, board),
		isValidMove,
		moveScore,
	};
};
