import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [
    {
      billFrom: "person2",
      billFromAddress: "100 random street",
      billFromEmail: "person2@test.com",
      billTo: "person1",
      billToAddress: "100 random street",
      billToEmail: "test10001@test.com",
      currentDate: "",
      dateOfIssue: "2023-09-01",
      discountAmount: "0.80",
      discountRate: "2",
      id: "823732",
      invoiceNumber: "1",
      currency: "$",
      items: [
        {
          itemDescription: "test",
          itemId: 0,
          itemName: "test",
          itemPrice: "20",
          itemQuantity: "2",
        },
      ],
      notes: "cool",
      subTotal: "40.00",
      taxAmount: "0.80",
      taxRate: "2",
      total: "40.00",
    },
  ],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
