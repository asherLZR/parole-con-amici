import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('renders hello world', () => {
	it.skip('', () => {
		const { getByText } = render(<App />);
		const txt = getByText(/hello world/i);
		expect(txt).toBeInTheDocument();
	});
});
