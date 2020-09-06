import React, { MouseEventHandler } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { PlayerCard, PlayerCardProps } from './PlayerCard';
import { FlashingIconButton } from '../FlashingButton';
import { useDispatch } from 'react-redux';
import { startConfetti } from '../../store/confetti';
import { useGameData, getCurrentTurnOrder } from '../../hooks/use-game-data';
import { Maybe } from '../../types/UtilityTypes';
import { GameData, Player } from '../../types/GameTypes';
import { usePlayerData } from '../../hooks/use-player-data';
import { getSortedPlayers } from '../../utilities/get-sorted-players';
import { hexToEmoji } from '../../utilities/hex-to-emoji';

interface Props {
	playerCards: PlayerCardProps[];
	winner?: string;
}

const useStyles = makeStyles<Theme>(theme => ({
	cardContainer: {
		position: 'relative',
	},
	celebrate: {
		position: 'absolute',
		top: '-1rem',
		right: '-1rem',
	},
}));

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

const PARTY_FACE = '1F973';

export const PlayerCardHolder = ({ playerCards, winner }: Props) => {
	const dispatch = useDispatch();
	const celebrate: MouseEventHandler = () => {
		dispatch(startConfetti());
	};
	const classes = useStyles();

	return (
		<Grid container direction='column' spacing={3}>
			{playerCards.map(playerCard => {
				return (
					<Grid
						container
						item
						alignItems='center'
						key={playerCard.username}
						className={classes.cardContainer}
					>
						<Grid item container justify='center'>
							<PlayerCard {...playerCard} />
						</Grid>
						{winner === playerCard.username && (
							<FlashingIconButton
								onClick={celebrate}
								className={classes.celebrate}
							>
								{hexToEmoji(PARTY_FACE)}
							</FlashingIconButton>
						)}
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
