import { AuthRoutes } from "./AuthRoutes";
import { CalendarRoutes } from "./CalendarRoutes";

export const AppRouter = (status) => {
    if (status === 'unauthenticated') {
        return AuthRoutes;
    } else {
        return CalendarRoutes;
    }
};