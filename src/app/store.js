import { configureStore } from '@reduxjs/toolkit'
import solverReducer from "../features/solver/solverSlice"

export default configureStore({
  reducer: {solver: solverReducer}
})
