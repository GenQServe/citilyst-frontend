import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  categoryId: Cookies.get("report_category_id") || "",
  categoryKey: Cookies.get("report_category_key") || "",
  title: Cookies.get("report_title") || "",
  description: Cookies.get("report_description") || "",
  districtId: Cookies.get("report_district_id") || "",
  villageId: Cookies.get("report_village_id") || "",
  location: Cookies.get("report_location") || "",
  reportId: Cookies.get("report_id") || "",
  formalDescription: Cookies.get("formal_description") || "",
  images: [],
  step: 1,
  isSubmitting: false,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categoryId = action.payload.id;
      state.categoryKey = action.payload.key;
      Cookies.set("report_category_id", action.payload.id);
      Cookies.set("report_category_key", action.payload.key);
    },
    setTitle: (state, action) => {
      state.title = action.payload;
      Cookies.set("report_title", action.payload);
    },
    setDescription: (state, action) => {
      state.description = action.payload;
      Cookies.set("report_description", action.payload);
    },
    setDistrictId: (state, action) => {
      state.districtId = action.payload;
      Cookies.set("report_district_id", action.payload);
    },
    setVillageId: (state, action) => {
      state.villageId = action.payload;
      Cookies.set("report_village_id", action.payload);
    },
    setLocation: (state, action) => {
      state.location = action.payload;
      Cookies.set("report_location", action.payload);
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setGeneratedReport: (state, action) => {
      state.reportId = action.payload.report_id;
      state.formalDescription = action.payload.formal_description;
      Cookies.set("report_id", action.payload.report_id);
      Cookies.set("formal_description", action.payload.formal_description);
    },
    clearReportForm: () => {
      Cookies.remove("report_category_id");
      Cookies.remove("report_category_key");
      Cookies.remove("report_title");
      Cookies.remove("report_description");
      Cookies.remove("report_district_id");
      Cookies.remove("report_village_id");
      Cookies.remove("report_location");
      Cookies.remove("report_id");
      Cookies.remove("formal_description");

      return {
        ...initialState,
        categoryId: "",
        categoryKey: "",
        title: "",
        description: "",
        districtId: "",
        villageId: "",
        location: "",
        reportId: "",
        formalDescription: "",
        images: [],
        step: 1,
        isSubmitting: false,
      };
    },
  },
});

export const {
  setCategory,
  setTitle,
  setDescription,
  setDistrictId,
  setVillageId,
  setLocation,
  setImages,
  setStep,
  setIsSubmitting,
  setGeneratedReport,
  clearReportForm,
} = reportSlice.actions;

export default reportSlice.reducer;
