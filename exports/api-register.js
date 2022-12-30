function apiRegister(req, res, generateToken, client) {
    const username = req.query.username;
    const password = req.query.password;
    const accountToken = generateToken({ min: 10000000000000000, max: 90000000000000000 });

    client.connect(async err => {
        const collection = client.db('DigiNote').collection('accounts');
        const usernameUsedBefore = await collection.findOne({
            username: username
        })

        if(usernameUsedBefore) {
            return res.redirect('/register/failure');
        }

        await collection.insertOne({
            username: username,
            password: password,
            accountToken: accountToken
        })
        await res.redirect('/register/success');
    })
}

module.exports = apiRegister;