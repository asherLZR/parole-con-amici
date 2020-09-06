import React from 'react';
import { ShuffleButton, RestoreButton, PlayMoveButton } from './ControlButtons';
import { useGameData } from '../../hooks/use-game-data';

export const ControlButtonContainer = () => {
	const {
		gameData,
		isPlayersTurn,
		isValidMove,
		movingTiles,
		isPendingSave,
	} = useGameData();

	return (
		<>
			<ShuffleButton />
			<RestoreButton movingTiles={movingTiles} />
			{/* allow play only if the move is valid */}
			<PlayMoveButton
				disabled={!isPlayersTurn || !isValidMove || !!gameData?.winner}
				isPendingSave={isPendingSave}
				gameId={gameData?.gameId}
				movingTiles={movingTiles}
			/>
		</>
	);
};
