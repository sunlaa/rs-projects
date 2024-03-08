type Route = {
  path: string;
  callback: () => void;
};

class Router {
  routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;

    window.addEventListener('hashchange', this.navigate);
  }

  navigate = (url: string | HashChangeEvent) => {
    if (typeof url === 'string') {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${url}`;
    }
    const hash = window.location.hash.slice(1);

    const route = this.routes.find((item) => item.path === hash);

    if (!route) {
      throw new Error('page not found!');
    }

    route.callback();
  };
}
export default Router;
