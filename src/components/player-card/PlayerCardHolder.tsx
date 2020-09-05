import React, { MouseEventHandler } from 'react';
import { Grid } from '@material-ui/core';
import { PlayerCard, PlayerCardProps } from './PlayerCard';
import { FlashingIconButton } from '../FlashingButton';
import { useDispatch } from 'react-redux';
import { startConfetti } from '../../store/confetti';
import { useGameData, getCurrentTurnOrder } from '../../hooks/use-game-data';
import { Maybe } from '../../types/UtilityTypes';
import { GameData, Player } from '../../types/GameTypes';
import { usePlayerData } from '../../hooks/use-player-data';
import { getSortedPlayers } from '../../utilities/get-sorted-players';

interface Props {
	playerCards: PlayerCardProps[];
	winner?: string;
}

const toPlayerCards = (
	gameData: Maybe<GameData>,
	allPlayers: Record<string, Player>
): PlayerCardProps[] => {
	if (!gameData) {
		return [];
	}

	// add player's state to list and sort all players cards by their order of play
	const states = getSortedPlayers(gameData);
	const currentTurnOrder = getCurrentTurnOrder(gameData);
	const { winner } = gameData;

	return states.map(player => {
		const { username, score, turnOrder } = player;
		return {
			username,
			score,
			icon: allPlayers[username]?.emoji ?? undefined,
			border: turnOrder === currentTurnOrder && !winner,
		};
	});
};

export const PlayerCardHolder = ({ playerCards, winner }: Props) => {
	const dispatch = useDispatch();
	const celebrate: MouseEventHandler = () => {
		dispatch(startConfetti());
	};

	return (
		<Grid container direction='column' spacing={3}>
			{playerCards.map(playerCard => {
				return (
					<Grid container item alignItems='center' key={playerCard.username}>
						<Grid item container xs={10} justify='center'>
							<PlayerCard {...playerCard} />
						</Grid>
						<Grid item xs={1} />
						<Grid item xs={1}>
							{winner === playerCard.username && (
								<FlashingIconButton onClick={celebrate}>
									{'🥳'}
								</FlashingIconButton>
							)}
						</Grid>
					</Grid>
				);
			})}
		</Grid>
	);
};

export const GamePlayerCardHolder = () => {
	const { gameData } = useGameData();
	const { allPlayers } = usePlayerData();
	const playerCards = toPlayerCards(gameData, allPlayers);

	return (
		<PlayerCardHolder playerCards={playerCards} winner={gameData?.winner} />
	);
};
