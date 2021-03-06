import { NavigationInstruction } from './interfaces.js';
import { NavRoute } from './nav-route.js';
import { INavClasses } from './resources/nav.js';
import { IRouter } from './router.js';

/**
 * Public API - Used by au-nav and Router add/setNav
 */
export interface INavRoute {
  route?: NavigationInstruction | NavigationInstruction[];
  execute?: ((route: NavRoute) => void);
  condition?: boolean | ((route: NavRoute) => boolean);
  consideredActive?: NavigationInstruction | NavigationInstruction[] | ((route: NavRoute) => boolean);
  compareParameters?: boolean;
  link?: string;
  title: string;
  children?: INavRoute[];
  meta?: Record<string, unknown>;
}

/**
 * Public API - Used by au-nav and Router add/setNav
 */
export class Nav {

  public constructor(
    public router: IRouter,
    public name: string,
    public routes: NavRoute[] = [],
    public classes: INavClasses = {}
  ) {
    this.update();
  }

  public addRoutes(routes: INavRoute[]): void {
    for (const route of routes) {
      this.addRoute(this.routes, route);
    }
    this.update();
  }

  public update(): void {
    this.updateRoutes(this.routes);
    this.routes = this.routes.slice();
  }

  private addRoute(routes: NavRoute[], route: INavRoute): void {
    const newRoute = new NavRoute(this, route);
    routes.push(newRoute);
    if (route.children) {
      newRoute.children = [];
      for (const child of route.children) {
        this.addRoute(newRoute.children, child);
      }
    }
  }

  private updateRoutes(routes: NavRoute[]): void {
    for (const route of routes) {
      route.update();
      if (route.children && route.children.length) {
        this.updateRoutes(route.children);
      }
    }
  }
}
