import {BASE_URL_FIXER} from '../utils/constants';

export const getExchangeRate = () => {
	return fetch(
		//`${BASE_URL_FIXER}latest?access_key=6a5f494262f1d3541092b90e1ddd6e38`,
		`${BASE_URL_FIXER}latest?access_key=c8cac5f8bb349c8752f0bedbc39ebdd3`,
		{
			mode: 'cors',
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'text/plain',
			},
		}
	)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => data);
};

export const getCurrentcyNames = () => {
	return fetch(
		//`${BASE_URL_FIXER}symbols?access_key=6a5f494262f1d3541092b90e1ddd6e38`,
		`${BASE_URL_FIXER}symbols?access_key=c8cac5f8bb349c8752f0bedbc39ebdd3`,
		{
			mode: 'cors',
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'text/plain',
			},
		}
	)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => data);
};
