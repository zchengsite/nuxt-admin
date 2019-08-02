// import store from '@/store';

export function getHomeRoute() {
  let homePage = '';
  const menus = JSON.parse(localStorage.getItem('navbar'));
  if (menus[0].href !== undefined) {
    homePage = menus[0];
  } else if (menus[1].href !== '') {
    homePage = menus[1];
  } else if (menus[1].children[0].href !== '') {
    homePage = menus[1].children[0];
  } else {
    homePage = menus[1].children[1];
  }
  localStorage.setItem('homePage', `/${homePage.href}`);

  return homePage;
}

export default {};
