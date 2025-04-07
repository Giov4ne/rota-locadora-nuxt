export default{
    loadUsers({ commit }){
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        if(users.length)
            commit('setUsers', users);
    },

    saveUsers({ state }){
        localStorage.setItem('registeredUsers', JSON.stringify(state.users));
    },

    addUser({ commit, dispatch }, user){
        commit('addUser', user);
        dispatch('saveUsers', user);
    }
}