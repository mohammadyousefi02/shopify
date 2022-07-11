import { createStore } from "redux"
import { persistStore } from "redux-persist"
import persistedReducer from "./persistor"

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)