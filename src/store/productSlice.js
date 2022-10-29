import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//use Object.freeze for object freeze. cannot change object value;

export const STATUS = Object.freeze({
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  data: [],
  status: STATUS.SUCCESS,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProducts(state, action) {
    //   //donot use this api in reducer. causes reducer is Synchronous process and api call is Asynchronous process
    //   // const res = await fetch("https://fakestoreapi.com/products");
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunks
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});

//basic thunk using in redux-toolkit
// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch, getState) {
//     try {
//       dispatch(setStatus(STATUS.LOADING));
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUS.SUCCESS));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(STATUS.ERROR));
//     }
//   };
// }
