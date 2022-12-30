function apiGetUsername(req, res, client) {
    const tokenSTRING = req.body.token;
    const token = parseInt(tokenSTRING);
    client.connect(async err => {
        const collection = client.db('DigiNote').collection('accounts');
        const doc = await collection.findOne({
            accountToken: token
        })
        res.send({ username: doc.username });
    })
}

module.exports = apiGetUsername;