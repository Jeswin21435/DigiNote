function apiAuthenticate(req, res, client) {
    const username = req.query.username;
    const password = req.query.password;

    client.connect(async err => {
        const collection = client.db('DigiNote').collection('accounts');

        const doc = await collection.findOne({
            username: username,
            password: password
        })
        
        if(!doc) {
            return res.redirect('/login/failure');
        }
        res.redirect(`/user/?accountToken=${doc.accountToken}`);
    })
}

module.exports = apiAuthenticate;