import React, { ReactNode, FC } from 'react';
import { useStyles } from './styles';
import { GridProps, Grid } from '@material-ui/core';

export interface SquareProps extends GridProps {
	children?: ReactNode;
	className: string;
	boardVp: number;
}

export const Square: FC<SquareProps> = React.forwardRef(
	({ children, className, boardVp, ...rest }: SquareProps, ref) => {
		const classes = useStyles({ boardVp });

		return (
			<Grid className={`${classes.square} ${className}`} {...rest} ref={ref}>
				<div className={classes.content}>
					<div className={classes.table}>
						<div className={classes.tableCell}>{children}</div>
					</div>
				</div>
			</Grid>
		);
	}
);
