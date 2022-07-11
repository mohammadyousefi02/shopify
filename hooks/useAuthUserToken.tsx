import {useCookies} from 'react-cookie'

function useAuthUserToken() {
    const [cookie,setCookie, removeCookie] = useCookies(['token'])
    const setToken = (token:string) => {
        setCookie('token', token, {path:"/"})
    }
    const removeToken = () => {
        removeCookie('token')
    }
    return [cookie.token, setToken, removeToken]
}

export default useAuthUserToken