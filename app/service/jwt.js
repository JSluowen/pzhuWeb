'use strict';
const jwt = require('jsonwebtoken');
const Service = require('egg').Service;

class Jwt extends Service {
<<<<<<< HEAD
    async signToken(params) {
        const { config } = this;
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 一天
                data: params,
            },
            config.token,
        );
        return token;
    }

    async verifyToken(token) {
        const { config } = this;
        let value;
        jwt.verify(token, config.token, err => {
            if (err) {
                value = false;
            } else {
                value = true;
            }
        });
        return value;
    }
=======
	async signToken(params) {
		const { config } = this;
		let token = jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //一天
				data: params
			},
			config.token
		);
		return token;
	}

	async verifyToken(token) {
		const { config } = this;
		let value;
		jwt.verify(token, config.token, (err, decode) => {
			if (err) {
				value = false;
			} else {
				value = true;
			}
		});
		return value;
	}
>>>>>>> 3f199b54746d5340482ec801ffbfeeb568fca84a
}
module.exports = Jwt;
