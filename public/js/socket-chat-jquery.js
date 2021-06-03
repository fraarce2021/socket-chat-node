let paramsChat = new URLSearchParams(window.location.search);

let divUsers = $('#divUsers');

let formSend = $('#formSend');

let txtMessage = $('#txtMessage');

let divChatbox = $('#divChatbox');

const renderUsers = (users) => {
    let html = '';

    html += '<li>';
    html += `<a href="javascript:void(0)" class="active"> Chat <span> ${paramsChat.get('room')}</span></a>`;
    html += '</li>';

    for (let i = 0; i < users.length; i++) {
        html += '<li>';
        html += `<a data-id="${users[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${users[i].name} <small class="text-success">online</small></span></a>`;
        html += '</li>';
    }
    console.log('test', users)
    divUsers.html(html);
}

const renderMessages = (message, me) => {
    console.log(message)
    let html = '';
    let date = new Date(message.date);
    let time = date.getHours() + ':' + date.getMinutes();

    let adminClass = 'info';
    if (message.name === 'Administrator') {
        adminClass = 'danger';
    }

    if (me) {

        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += `<h5>${message.name}</h5>`;
        html += `<div class="box bg-light-inverse">${message.message}</div>`;
        html += '</div>';
        html += `<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>`;
        html += `<div class="chat-time">${time}</div>`;
        html += '</li>';
    } else {

        html += '<li class="animated fadeIn">';

        if (message.name !== 'Administrator') {
            html += `<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`;
        }
        html += '<div class="chat-content">';
        html += `<h5>${message.name}</h5>`;
        html += `<div class="box bg-light-${adminClass}">${message.message}</div>`;
        html += '</div>';
        html += `<div class="chat-time">${time}</div>`;
        html += '</li>';
    }

    divChatbox.append(html);
}

//Listeners

divUsers.on('click', 'a', function() {
    let id = $(this).data('id');

    if (id) {
        console.log(id);
    }
})

formSend.on('submit', (e) => {
    e.preventDefault();
    if (txtMessage.val().trim().length === 0) {
        return;
    }
    socket.emit('createMessage', {
        user: paramsChat.get('name'),
        message: txtMessage.val()
    }, (resp) => {
        txtMessage.val('').focus();
        renderMessages(resp, true);
        scrollBottom();
    });
});

const scrollBottom = () => {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
};