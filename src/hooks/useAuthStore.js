import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessages, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector(state => state.auth);

    const startLogin = async({ email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.tkn);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessages());
            }, 1000);
        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch(onChecking());

        try {
            await calendarApi.post('/auth/new', { name, email, password });
        } catch (error) {
            dispatch(onLogout(error.response.data?.message ||
                Object.values(error.response.data?.errors).map(e => e.msg).join("<br/>") ||
                'Ha ocurrido un error inesperado'));
            console.log({ error });
            setTimeout(() => {
                dispatch(clearErrorMessages());
            }, 1000);
        }
    }
    
    return {
        // Properties
        status,
        user,
        errorMessage,
        startRegister,

        // Methods
        startLogin
    }
}