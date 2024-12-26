import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Breed, BreedsState } from "../../type/breeds";
import { getBreeds } from "../../services/api";

const initialState: BreedsState = {
    loading: false,
    breeds: [],
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
    },
};

export const fetchBreeds = createAsyncThunk(
    "breeds/fetchBreeds",
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await getBreeds(page);
            const { data, links } = response.data;
            const totalPages = links.last
                ? parseInt(links.last.split("page[number]=")[1], 10)
                : 1;
            return { breeds: data, currentPage: page, totalPages };
        } catch (error: any) {
            return rejectWithValue("Failed to fetch breeds.");
        }
    }
);

const breedsSlice = createSlice({
    name: "breeds",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreeds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBreeds.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.breeds = action.payload.breeds;
                state.pagination.currentPage = action.payload.currentPage;
                state.pagination.totalPages = action.payload.totalPages;
            })
            .addCase(fetchBreeds.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default breedsSlice.reducer;
