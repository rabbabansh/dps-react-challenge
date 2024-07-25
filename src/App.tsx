import dpsLogo from './assets/DPS.svg';
import './App.css';
import UserSearch from './components/UserSearch';

function App() {
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<UserSearch />
			</div>
		</>
	);
}

export default App;
