class Users {
    constructor() {
        this.users = [];
    }

    addUsers(id, name, room) {
        let user = { id, name, room };

        this.users.push(user);

        return this.users;
    }

    getUser(id) {
        let user = this.users.filter(user => user.id === id)[0];
        return user;
    }

    getUsers() {
        return this.users;
    }

    getUsersChatRoom(room) {
        let usersRoom = this.users.filter(user => user.room === room);
        return usersRoom;
    }

    removeUser(id) {

        let userDeleted = this.getUser(id);

        this.users = this.users.filter(user => user.id != id);

        return userDeleted;
    }
}

module.exports = {
    Users
}