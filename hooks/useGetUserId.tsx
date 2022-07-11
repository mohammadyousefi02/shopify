import useAuthUserToken from './useAuthUserToken'
import jwtDecode from 'jwt-decode'

import { IdecodedToken } from "../interfaces/decodedTokenInterface"

function useGetUserId() {
    const [token] = useAuthUserToken()
    let userId:IdecodedToken = {_id:""}
    if(token) {
        userId = jwtDecode(token)
    }
   return userId
}

export default useGetUserId