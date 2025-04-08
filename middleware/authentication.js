export default function ({ route, redirect, $auth }) {
       
    const token = localStorage.getItem("auth._token.local");
    // console.log(token !== 'false')
    //const isAuthenticated = store.state.users.authenticated;
    
    if (token === 'false' && route.path !== '/login' && route.path !== '/signup') {
        localStorage.removeItem('auth._refresh_token.local');
        localStorage.removeItem('auth._refresh_token_expiration.local');
        localStorage.removeItem('auth._token_expiration.local');
        localStorage.removeItem('auth.strategy');
        return redirect('/login'); // Permite acesso ao login e cadastro sem estar autenticado
    } else if (token !== 'false' && (route.path === '/login' || route.path === '/signup')) {
        return redirect('/home'); // Se estiver logado, não pode acessar login nem cadastro
    } else{
        $auth.fetchUser()
        // return redirect();
    }
    
}


