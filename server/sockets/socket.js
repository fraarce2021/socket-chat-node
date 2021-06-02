const { io } = require('../server');
const { Users } = require('../classes/users')
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {

        if (!data.name || !data.room) {
            return callback({
                err: true,
                messsage: 'Name/Room is required'
            });
        }

        client.join(data.room);

        users.addUsers(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('listUsers', users.getUsersChatRoom(data.room));

        callback(users.getUsersChatRoom(data.room));

    });

    client.on('createMessage', (data, callback) => {
        let user = users.getUser(client.id);

        let message = createMessage(user.name, data.message);
        client.broadcast.to(user.room).emit('createMessage', message);

        callback(message);
    });

    client.on('disconnect', () => {

        let userRemove = users.removeUser(client.id);

        client.broadcast.to(userRemove.room).emit('createMessage', createMessage('Administrator', `${userRemove.name} leave chat`));

        client.broadcast.to(userRemove.room).emit('listUsers', users.getUsersChatRoom(userRemove.room));
    });

    client.on('privateMessage', (data) => {

        let user = users.getUser(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));

    });
});