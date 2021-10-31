import {useState, useEffect, createRef} from 'react';

import * as fixerApi from '../../utils/fixerApi';
import CurrentcyCard from '../CurrentcyCard/CurrentcyCard';
import {COUNTRY_CURRENTCY_ABBREVIATION} from '../../utils/constants';

import './App.css';

function App() {
	const [exchangeRates, setExchangeRate] = useState([]);
	const [currentcyNames, setCurrentcyNames] = useState([]);

	const [currentCurrentcy, setCurrentCurrentcy] = useState({
		name: '',
		abbreviation: '',
		rate: 0,
	});

	const [isCardVisible, setIsCardVisible] = useState(false);

	const countryCurrentcyAbbreviations = Object.entries(
		COUNTRY_CURRENTCY_ABBREVIATION
	);

	const getInfoAboutCurrencies = () => {
		Promise.all([
			fixerApi.getExchangeRate(),
			fixerApi.getCurrentcyNames(),
		]).then(([exchangeRates, currentcyNames]) => {
			setExchangeRate(Object.entries(exchangeRates.rates));
			setCurrentcyNames(Object.entries(currentcyNames.symbols));
		});
	};

	useEffect(() => {
		getInfoAboutCurrencies();
	}, []);

	const currentcyRef = createRef();

	const findCurrentcyCountry = (currentcy) => {
		if (currentcy === 'EUR') {
			return ['eu', 'EUR'];
		} else if (currentcy === 'USD') {
			return ['us', 'USD'];
		} else if (currentcy === 'ANG') {
			return ['cw', 'ANG'];
		} else if (currentcy === 'BTC') {
			return ['aq', 'BTC'];
		} else {
			return countryCurrentcyAbbreviations.find(
				(countryCurrentcyAbbreviation) => {
					return countryCurrentcyAbbreviation[1] === currentcy;
				}
			);
		}
	};

	const handleSelectCurentcy = () => {
		const choiceCurrentcy = currentcyRef.current.value.split(',');

		let choiceCurrentcyRate = exchangeRates.find((exchangeRate) => {
			return exchangeRate[0] === choiceCurrentcy[0];
		});

		let countryAbbreviation = findCurrentcyCountry(choiceCurrentcy[0]);

		setCurrentCurrentcy({
			name: choiceCurrentcy[1],
			abbreviation: choiceCurrentcy[0],
			rate: choiceCurrentcyRate[1],
			country: countryAbbreviation[0].toLowerCase(),
		});

		setIsCardVisible(true);
	};

	return (
		<div className='app'>
			<select
				className='app__select'
				ref={currentcyRef}
				onChange={handleSelectCurentcy}
			>
				{currentcyNames.map((currentcyName, i) => (
					<option key={i} value={currentcyName}>
						{currentcyName[1]}
					</option>
				))}
			</select>
			<CurrentcyCard currentcy={currentCurrentcy} isVisible={isCardVisible} />
		</div>
	);
}

export default App;
