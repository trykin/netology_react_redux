import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IComponent {
  name: string;
  price: string;
}

const initialState: IComponent[] = [];

export const componentSlice = createSlice({
  name: "component",

  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<IComponent>) => {
      const currentState = state;
      currentState.push(action.payload);
      state = currentState;
    },
    deleteComponent: (state, action: PayloadAction<IComponent>) => {
      const currentState = state;
      currentState.forEach((item, index) => {
        if (
          item.name === action.payload.name &&
          item.price === action.payload.price
        )
          currentState.splice(index, 1);
      });

      state = currentState;
    },
    editComponent: (
      state,
      action: PayloadAction<{
        oldComponent: IComponent;
        newComponent: IComponent;
      }>
    ) => {
      const currentState = state;
      currentState.forEach((item, index) => {
        if (
          item.name === action.payload.oldComponent.name &&
          item.price === action.payload.oldComponent.price
        )
          currentState.splice(index, 1, action.payload.newComponent);
      });

      state = currentState;
    },
  },
});

export const { addComponent, deleteComponent, editComponent } =
  componentSlice.actions;

export default componentSlice.reducer;
