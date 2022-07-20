import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userReducer";
import savedItemsReducer from "./slices/savedItemsReducer";
import cartReducer from "./slices/cartReducer";
import productsReducer from "./slices/productsReducer";
import categorySlice from "./slices/category";




const rootReducer = combineReducers({
    user:userReducer,
    savedItems:savedItemsReducer,
    cart:cartReducer,
    products:productsReducer,
    category:categorySlice
})

const persistConfig = { 
    key:'root',
    storage,
    blacklist:['user','savedItems','cart','products','category']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;