import CakeDTO from "@/dto/cake/cakeDTO";
import CakeFormDTO from "@/dto/cake/cakeFormDTO";
import GetCakesDTO from "@/dto/cake/getCakesDTO";
import Cake from "@/models/cake";
import { cakeList$ } from "@/stores/cakesStore";
import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";

const apiUrl = "/cakes";

/**
 * Fetch a single cake by its ID.
 *
 * @param {string} cakeId - The ID of the cake to fetch
 * @returns {Promise<Cake>} - Returns a Cake instance
 */
const sendGetCakeByIdRequest = async (cakeId: string): Promise<Cake> => {
    return await axiosInstance.get(`${apiUrl}/${cakeId}`)
        .then(res => new Cake(res.data));
}

/**
 * Fetch a list of cakes with optional filtering, sorting, and pagination.
 *
 * Updates the global cake store's `totalPages`.
 *
 * @param {GetCakesDTO} params - Query parameters for filtering, sorting, and pagination
 * @returns {Promise<Cake[]>} - Returns an array of Cake instances
 */
const sendGetCakesRequest = async (params: GetCakesDTO): Promise<Cake[]> => {
    return await axiosInstance.get(apiUrl, { params })
        .then(res => res.data)
        .then(data => {
            cakeList$.totalPages.set(data.totalPages);
            return data.cakes.map((cake: CakeDTO) => new Cake(cake));
        });
}

/**
 * Send a request to create a new cake.
 *
 * @param {CakeFormDTO} reqBody - Cake data (name and price)
 * @returns {Promise<AxiosResponse>} - Axios response
 */
const sendCreateCakeRequest = async (reqBody: CakeFormDTO): Promise<AxiosResponse> => {
    return await axiosInstance.post(apiUrl, reqBody);
}

/**
 * Send a request to edit an existing cake.
 *
 * @param {string} cakeId - The ID of the cake to edit
 * @param {CakeFormDTO} reqBody - Updated cake data
 * @returns {Promise<AxiosResponse>} - Axios response
 */
const sendEditCakeRequest = async (cakeId: string, reqBody: CakeFormDTO): Promise<AxiosResponse> => {
    return await axiosInstance.put(`${apiUrl}/${cakeId}`, reqBody);
}

/**
 * Send a request to delete a cake.
 *
 * @param {string} cakeId - The ID of the cake to delete
 * @returns {Promise<AxiosResponse>} - Axios response
 */
const sendDeleteCakeRequest = async (cakeId: string): Promise<AxiosResponse> => {
    return await axiosInstance.delete(`${apiUrl}/${cakeId}`);
}

export {
    sendCreateCakeRequest,
    sendDeleteCakeRequest,
    sendEditCakeRequest,
    sendGetCakeByIdRequest,
    sendGetCakesRequest
};

