import { FlashingIconButton } from '../FlashingButton';
import React from 'react';
import { Check, Restore, Shuffle } from '@material-ui/icons';
import { IconButton, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
	handlePostMoveTile,
	handleRestoreTiles,
	handleShuffleTiles,
} from '../../store/game-data/actions';
import { PlacedTile } from '../../types/GameTypes';

export interface PlayMoveButtonProps {
	disabled: boolean;
	gameId?: string;
	movingTiles: PlacedTile[];
	isPendingSave: boolean;
	className?: string;
}

export const PlayMoveButton = ({
	disabled,
	gameId,
	movingTiles,
	isPendingSave,
	className = '',
}: PlayMoveButtonProps) => {
	const dispatch = useDispatch();

	const makeMove = () => {
		if (gameId) {
			dispatch(handlePostMoveTile({ gameId, placedTiles: movingTiles }));
		}
	};

	return (
		<FlashingIconButton
			disabled={disabled || isPendingSave}
			onClick={makeMove}
			className={className}
		>
			{isPendingSave ? (
				<CircularProgress
					style={{ width: '1.5rem', height: '1.5rem' }}
					color='secondary'
				/>
			) : (
				<Check />
			)}
		</FlashingIconButton>
	);
};

interface RestoreButtonProps {
	movingTiles: PlacedTile[];
	className?: string;
}

export const RestoreButton = ({
	movingTiles,
	className = '',
}: RestoreButtonProps) => {
	const dispatch = useDispatch();

	const restoreTiles = () => {
		dispatch(handleRestoreTiles(movingTiles));
	};

	return (
		<IconButton
			disabled={movingTiles.length === 0}
			onClick={restoreTiles}
			className={className}
		>
			<Restore />
		</IconButton>
	);
};

interface ShuffleButtonProps {
	className?: string;
}

export const ShuffleButton = ({ className = '' }: ShuffleButtonProps) => {
	const dispatch = useDispatch();

	const shuffleTiles = () => {
		dispatch(handleShuffleTiles());
	};
	return (
		<IconButton onClick={shuffleTiles} className={className}>
			<Shuffle />
		</IconButton>
	);
};
