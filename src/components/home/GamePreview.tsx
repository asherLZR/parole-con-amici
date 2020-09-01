import { makeStyles, Theme, Grid } from '@material-ui/core';
import { GameData } from '../../types/GameTypes';
import { useHistory } from 'react-router-dom';
import { getCurrentTurnOrder } from '../../hooks/use-game-data';
import { ROUTES } from '../../routes';
import { BoardWithTiles } from '../board/BoardWithTiles';
import React from 'react';
import { TileSet } from '../../constants/tile-defaults';

const useStyles = makeStyles<Theme, { isPlayersTurn: boolean }>(theme => ({
	emojiList: {
		listStyle: 'none',
		fontSize: '1.3rem',
	},
	board: {
		cursor: 'pointer',
		margin: '0.7rem',
		border: '4px solid',
		borderColor: ({ isPlayersTurn }) =>
			isPlayersTurn ? theme.palette.primary.light : 'transparent',
		lineHeight: 0,
		'& :hover': {
			borderColor: theme.palette.secondary.dark,
		},
	},
}));

interface Props {
	gameData: GameData;
}

const PREVIEW_SIZE = 60;

export const GamePreview = ({ gameData }: Props) => {
	const { tilesOnBoard, language } = gameData;
	const history = useHistory();
	const isPlayersTurn = getCurrentTurnOrder(gameData) === gameData.turnOrder;
	const classes = useStyles({ isPlayersTurn });

	return (
		<>
			<Grid container>
				<div
					className={classes.board}
					onClick={() => {
						history.push(ROUTES.game.path + `/${gameData.shortId}`);
					}}
				>
					<BoardWithTiles
						placedTiles={tilesOnBoard}
						boardVp={PREVIEW_SIZE}
						tileset={TileSet[language].tileset}
					/>
				</div>
			</Grid>
		</>
	);
};
