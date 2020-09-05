import { makeStyles, Theme, Grid } from '@material-ui/core';
import { GameData, Player } from '../../types/GameTypes';
import { useHistory } from 'react-router-dom';
import { getCurrentTurnOrder } from '../../hooks/use-game-data';
import { ROUTES } from '../../routes';
import { BoardWithTiles } from '../board/BoardWithTiles';
import React from 'react';
import { TileSet } from '../../constants/tile-defaults';
import { ProfileEmojiAvatar } from '../IconLogo';

const useStyles = makeStyles<Theme, boolean>(theme => ({
	root: {
		position: 'relative',
	},
	emojiList: {
		listStyle: 'none',
		fontSize: '1.3rem',
	},
	board: {
		cursor: 'pointer',
		margin: '0.7rem',
		border: '4px solid',
		borderColor: focus => (focus ? theme.palette.primary.light : 'transparent'),
		lineHeight: 0,
		'& :hover': {
			borderColor: theme.palette.secondary.dark,
		},
	},
	avatar: {
		position: 'absolute',
		left: '0.1rem',
		top: '0.1rem',
		zIndex: 5,
	},
}));

interface Props {
	gameData: GameData;
	players: Record<string, Player>;
}

const PREVIEW_SIZE = 60;

export const GamePreview = ({ gameData, players }: Props) => {
	const { tilesOnBoard, language, winner } = gameData;
	const history = useHistory();
	const isPlayersTurn = getCurrentTurnOrder(gameData) === gameData.turnOrder;
	const classes = useStyles(isPlayersTurn && !winner);

	return (
		<div className={classes.root}>
			{winner && (
				<ProfileEmojiAvatar
					size={1}
					className={classes.avatar}
					emoji={players[winner]?.emoji}
				/>
			)}
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
		</div>
	);
};
