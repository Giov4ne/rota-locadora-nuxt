export default function ({ route, redirect }) {
       
    const user = localStorage.getItem('loggedUser') ?? null;

    if (!user && route.path !== '/login' && route.path !== '/signup') {
        return redirect('/login'); // Permite acesso ao login e cadastro sem estar autenticado
    } else if (user && (route.path === '/login' || route.path === '/signup')) {
        return redirect('/home'); // Se estiver logado, não pode acessar login nem cadastro
    } else {
        return redirect();
    }
    
}

/* 
Se eu quisesse fazer essa lógica de autenticação utilizando store (apenas como exemplo didático), poderia fazer dessa forma:

export default function({ route, redirect, store }) {

    const user = store.state.user.username;

    if (user.length === 0 && route.path !== '/login' && route.path !== '/signup') {
        return redirect('/login'); // Permite acesso ao login e cadastro sem estar autenticado
    } else if (user.length > 0 && (route.path === '/login' || route.path === '/signup')) {
        return redirect('/home'); // Se estiver logado, não pode acessar login nem cadastro
    } else {
        return redirect();
    }

}

*/