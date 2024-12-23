import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

/* Initial state */
const initialState = {
  key: "",
  subscriptionId: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

/* Async actions */
export const getRazorpayKey = createAsyncThunk("razorpay/getKey", async () => {
  try {
    const response = await axiosInstance.get("/payments/razorpay-key");
    return response.data;
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to load Razorpay key!");
  }
});

export const purchaseCourseBundle = createAsyncThunk(
  "razorpay/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("/payments/subscribe");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to purchase bundle!");
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "razorpay/verifyPayment",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment verification failed!");
    }
  }
);

export const getPaymentRecords = createAsyncThunk(
  "razorpay/getRecords",
  async () => {
    try {
      const response = await axiosInstance.get("/payments/count=100");
      toast.promise(response, {
        loading: "Fetching payment records...",
        success: (data) => data?.data?.message || "Records fetched successfully!",
      });
      return (await response).data;
    } catch (error) {
      toast.error("Failed to fetch payment records!");
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "razorpay/cancelBundle",
  async () => {
    try {
      const response = await axiosInstance.post("/payments/unsubscribe");
      toast.promise(response, {
        loading: "Unsubscribing the bundle...",
        success: (data) => data?.data?.message || "Unsubscribed successfully!",
        error: "Failed to unsubscribe!",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unsubscription failed!");
    }
  }
);

/* Slice definition */
const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayKey.fulfilled, (state, action) => {
        state.key = action.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscriptionId = action.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action.payload?.message || "Payment verified!");
        state.isPaymentVerified = action.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.error(action.payload?.message || "Payment verification failed!");
        state.isPaymentVerified = false;
      })
      .addCase(getPaymentRecords.fulfilled, (state, action) => {
        toast.success(action.payload?.message || "Payment records fetched!");
        state.allPayments = action.payload?.allPayments;
        state.finalMonths = action.payload?.finalMonths;
        state.monthlySalesRecord = action.payload?.monthlySalesRecord;
      });
  },
});

export default razorpaySlice.reducer;
