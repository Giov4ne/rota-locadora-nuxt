export default {
    setUsers(state, newUsers){
        state.users = newUsers;
    },

    addUser(state, user){
        state.users.push(user);
    }
}