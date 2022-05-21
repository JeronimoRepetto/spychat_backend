const ObjectId = require('mongoose').Types.ObjectId;
const Menssage = require('../models/message');

const takeChat = async (req, res = response) => {
    const myId = new ObjectId(req.uid);
    console.log({ myId });
    const messageTo = new ObjectId(req.params.to);
    console.log({ messageTo });

    //const last30 = await Menssage
    //    .find({ from: { from: myId }, to: { to: messageTo }  })
    //    .sort({ createdAt: 'desc' })
    //    .limit(30);
    const last30 = await Menssage.find(
        {
            $or: [
                { from: myId, to: messageTo },
                { form: messageTo, to: myId }
            ]
        }
    ).sort({ createdAt: 'desc' })

    console.log({ last30 });

    res.json({
        ok: true,
        messages: last30
    });
}

module.exports = {
    takeChat
}