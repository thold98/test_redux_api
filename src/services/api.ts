import axios from "axios";

export const getBreeds = (page: number = 1) => {
    return axios.get(`https://dogapi.dog/api/v2/breeds?page[number]=${page}`);
};
