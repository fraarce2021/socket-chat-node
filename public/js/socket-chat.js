let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name is required');
}

let user = {
    name: params.get('name'),
    room: params.get('room')
};

//On to listen the server
socket.on('connect', () => {
    console.log('Connect on server');

    socket.emit('enterChat', user, (resp) => {

        console.log('User Connected', resp);
        renderUsers(resp);
    });
});

socket.on('disconnect', () => {
    console.log('Perdimos la conexion con el servidor');
});

//Emit send data
// socket.emit('createMessage', {
//     user: 'Francisco',
//     message: 'My message'
// }, (resp) => {
//     console.log('Response Server', resp)
// });

//Listen data
socket.on('createMessage', (resp) => {
    renderMessages(resp, false);
    scrollBottom();
});

//When user in or out of room
socket.on('listUsers', (resp) => {
    renderUsers(resp);

})

//Private message

socket.on('privateMessage', (resp) => {
    console.log('Private message', resp)
});