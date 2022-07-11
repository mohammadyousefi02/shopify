import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userReducer";
import savedItemsReducer from "./slices/savedItemsReducer";




const rootReducer = combineReducers({
    user:userReducer,
    savedItems:savedItemsReducer
})

const persistConfig = { 
    key:'root',
    storage,
    blacklist:['user','savedItems']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;