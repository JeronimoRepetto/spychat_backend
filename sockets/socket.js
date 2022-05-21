const { validatorJWT } = require('../helpers/jwt.js');
const { io } = require('../index.js');
const {userConnected, userDisconnected, saveMessage} = require ('../controllers/socket')
// Mensajes de Socket
io.on('connection', client => {
    console.log('Client connect');
    const [itsOk, uid] = validatorJWT(client.handshake.headers['x-token']);
   
    //verify Auth
    if (!itsOk) {
        return client.disconnect();
    }

    // user connected
    userConnected(uid);

    // Connect user to place
    //Global place,
    client.join(uid);

    client.on('personal-message', async (payload)=>{
        console.log(payload);
        //TODO Save Message
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message',payload);
    });


    client.on('disconnect', () => {
        console.log('Client desconnect');
        userDisconnected(uid);
    });

    //client.on('mensaje',( payload )=> {
    //    console.log("Mensaje!!", payload );
    //io.emit( 'mensaje' , { admin: 'Nuevo mensaje'});
    //});
});