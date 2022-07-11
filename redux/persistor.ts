import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userReducer";
import savedItemsReducer from "./slices/savedItemsReducer";
import cartReducer from "./slices/cartReducer";




const rootReducer = combineReducers({
    user:userReducer,
    savedItems:savedItemsReducer,
    cart:cartReducer
})

const persistConfig = { 
    key:'root',
    storage,
    blacklist:['user','savedItems','cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;