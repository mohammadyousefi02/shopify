import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userReducer";
import savedItemsReducer from "./slices/savedItemsReducer";
import cartReducer from "./slices/cartReducer";
import productsReducer from "./slices/productsReducer";
import categorySlice from "./slices/category";
import paginationSlice from "./slices/pagination" 




const rootReducer = combineReducers({
    user:userReducer,
    savedItems:savedItemsReducer,
    cart:cartReducer,
    products:productsReducer,
    category:categorySlice,
    pagination:paginationSlice
})

const persistConfig = { 
    key:'root',
    storage,
    blacklist:['user','savedItems','cart','products','category','pagination']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;