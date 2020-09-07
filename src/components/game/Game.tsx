import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Board } from '../board/Board';
import { useProgress } from '../../hooks/use-progress';
import { useGameData, useDispatchGameData } from '../../hooks/use-game-data';
import {
	Route,
	RouteComponentProps,
	useParams,
	Switch,
	useHistory,
} from 'react-router-dom';
import { GamePlayerCardHolder } from '../player-card/PlayerCardHolder';
import { BOARD_VP } from '../../constants/board-sizes';
import Confetti from '../Confetti';
import { ROUTES } from '../../routes';
import { usePrevious } from '../../hooks/use-previous';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ControlButtonContainer } from './ControlButtonContainer';
import { TileRack } from '../TileRack';
import { GameInfo } from './GameInfo';
import { TileSet } from '../../constants/tile-defaults';
import { useDispatch } from 'react-redux';
import { socketUpdateGame } from '../../store/game-data/actions';
import { socket } from '../../components/protected/ProtectedHandler';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

export const useStyles = makeStyles<Theme>(theme => ({
	root: {
		paddingTop: '1rem',
		'& .MuiIconButton-root': {
			width: '3.5rem',
			height: '3.5rem',
		},
		overflow: 'hidden', //FIXME:
	},
	fullWidth: {
		padding: '1rem',
		'& > .MuiGrid-item': {
			width: '100%',
		},
	},
	rackContainer: {
		width: `${BOARD_VP + 2}vmin`,
		'&>*': {
			margin: '0px 0.5rem',
		},
	},
	controlButtons: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '1rem',
			flexDirection: 'row',
		},
		[theme.breakpoints.up('md')]: {
			flexDirection: 'column',
		},
	},
}));

const GameComponent = () => {
	const classes = useStyles();

	const { isPendingLoad: isPending, board, gameData } = useGameData();

	useProgress(isPending);

	return (
		<Grid container className={classes.root} data-testid='game'>
			<Grid
				item
				container
				direction='column'
				alignItems='center'
				sm={12}
				md={4}
				spacing={6}
				className={classes.fullWidth}
			>
				<Grid item>{gameData && <GameInfo gameData={gameData} />}</Grid>
				<Grid item>
					<GamePlayerCardHolder />
				</Grid>
			</Grid>
			<Grid
				item
				container
				direction='column'
				alignItems='center'
				sm={12}
				md={7}
				spacing={1}
			>
				<Grid item>
					<Board
						board={board}
						boardVp={BOARD_VP}
						tileset={gameData ? TileSet[gameData.language].tileset : {}}
					/>
				</Grid>
				<Grid
					item
					container
					justify='center'
					alignItems='center'
					className={classes.rackContainer}
				>
					<TileRack
						tileRack={gameData?.rack ?? []}
						boardVp={BOARD_VP}
						tileset={gameData ? TileSet[gameData.language].tileset : {}}
					/>
				</Grid>
			</Grid>
			<Grid
				item
				container
				className={classes.controlButtons}
				justify='space-around'
				sm={12}
				md={1}
			>
				<ControlButtonContainer />
			</Grid>
			<Confetti />
		</Grid>
	);
};

/**
 * If it is an existing game, the gameId will be in the params, so dispatch to get
 * data for that game
 */
const ExistingGame = () => {
	const { gameId } = useParams<{ gameId: string }>();
	useDispatchGameData(gameId);
	const dispatch = useDispatch();

	useEffect(() => {
		socket.on(gameId, (game: string) => {
			dispatch(socketUpdateGame(JSON.parse(game)));
		});

		return () => {
			socket.off(gameId);
		};
	}, [dispatch, gameId]);

	return <GameComponent />;
};

/**
 * If it is a new game, we don't know the game id yet, and the POST /new-game has already
 * been dispatched, so wait for the response with the new game id
 */
const NewGame = () => {
	const { gameData } = useGameData();
	const history = useHistory();

	const shortId = gameData?.shortId;
	const prevId = usePrevious(shortId);
	useEffect(() => {
		if (!prevId && shortId) {
			history.replace(ROUTES.game.path + '/' + shortId);
		}
	}, [prevId, shortId, history]);

	return <GameComponent />;
};

export const Game = ({ match }: RouteComponentProps) => {
	return (
		<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
			<Switch>
				<Route path={match.url + ROUTES.game.params} component={ExistingGame} />
				<Route path={match.url} component={NewGame} />
			</Switch>
		</DndProvider>
	);
};

export default Game;
