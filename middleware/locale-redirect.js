export default function ({params, route, redirect}) {
    if (route.path === '/') {
        // const homePage = localStorage.getItem('homePage');
        redirect('/menu-1');
    }
}
