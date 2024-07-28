import lightLogo from './assets/DPS-light.svg';
import darkLogo from './assets/DPS-dark.svg';
import './App.css';
import UserSearch from './components/UserSearch';
import { ThemeProvider, useTheme } from '@/components/theme/theme-provider';
import { ModeToggle } from './components/theme/mode-toggle';

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AppContent />
		</ThemeProvider>
	);
}

function AppContent() {
	const { theme } = useTheme();

	return (
		<>
			<div className="flex justify-between">
				<a
					href="https://www.digitalproductschool.io/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={theme === 'dark' ? darkLogo : lightLogo}
						className="logo"
						alt="DPS logo"
					/>
				</a>
				<div className="flex items-center h-[6em] justify-center">
					<ModeToggle />
				</div>
			</div>
			<div className="home-card">
				<UserSearch />
			</div>
		</>
	);
}

export default App;
