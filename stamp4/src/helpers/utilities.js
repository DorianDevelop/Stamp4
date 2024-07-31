import axios from 'axios';
import VueCookies from 'vue-cookies';

export const getIfAdmin = function () {
	return new Promise((resolve, reject) => {
		axios
			.get(`http://10.192.136.74:3000/stamp3ate/isAdmin/${VueCookies.get('user').label}`)
			.then((reponse) => reponse.data)
			.then((data) => {
				if (data.length !== 1) {
					resolve(false);
				} else if (data.length >= 3) {
					reject(`Error with user, 3 ou plus lignes dans Opérateur détécté. Merci d'en avoir qu'une seule.`);
				} else {
					if (data[0].level === 4) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			});
	});
};
