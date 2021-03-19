import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dictionary from './Dictionary';
import MainPage from './MainPage';
import { IAppState } from '../store/types';

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = () => (
	<HashRouter>
		<Switch>
			<Route path="/dictionary">
				<Dictionary />
			</Route>
			<Route path="/">
				<MainPage />
			</Route>
		</Switch>
	</HashRouter>
);

const mapStateToProps = (state: IAppState) => ({
	isLoggedIn: state.isLoggedIn,
	isRegistered: state.isRegistred,
	userName: state.userName,
	userImage: state.userImage,
});

const connector = connect(mapStateToProps);

export default connector(App);
