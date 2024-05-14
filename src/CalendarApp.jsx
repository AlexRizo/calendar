import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";
import { AppRouter } from "./router"
import { store } from "./store";

export const CalendarApp = () => {
    const routerStatus = 'authenticated';
    
    return (
        <Provider store={ store }>
            <RouterProvider router={ createBrowserRouter(AppRouter(routerStatus)) } />
        </Provider>
    )
}