import { MARGIN_VP, calculateSquareVp } from '../../constants/board-sizes';
import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { boardVp: number }>(theme => ({
	square: ({ boardVp }) => {
		return {
			position: 'relative',
			float: 'left',
			width: `${calculateSquareVp(boardVp)}vmin`,
			paddingBottom: `${calculateSquareVp(
				boardVp
			)}vmin` /* = width for a 1:1 aspect ratio */,
			margin: `${MARGIN_VP}vmin`,
			backgroundColor: theme.palette.common.black,
			cursor: 'default',
			userSelect: 'none',
		};
	},
	content: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		// padding: '0% 5%',
		textAlign: 'center',
		// border: `1px solid ${theme.palette.primary.dark}`,
		boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
	},
	table: {
		display: 'table',
		height: '100%',
		width: '100%',
	},
	tableCell: {
		display: 'table-cell',
		verticalAlign: 'middle',
		height: '100%',
		width: '100%',
		position: 'relative',
	},
}));
