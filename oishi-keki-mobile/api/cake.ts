import CakeDTO from "@/dto/cake/cakeDTO";
import CakeFormDTO from "@/dto/cake/cakeFormDTO";
import GetCakesDTO from "@/dto/cake/getCakesDTO";
import Cake from "@/models/cake";
import { cakeList$ } from "@/stores/cakesStore";
import axiosInstance from "@/utils/axios";

const apiUrl = "/cakes";

const sendGetCakeByIdRequest = async (cakeId: string): Promise<Cake> => {
    return await axiosInstance.get(`${apiUrl}/${cakeId}`)
        .then(res => new Cake(res.data));
}

const sendGetCakesRequest = async (params: GetCakesDTO): Promise<Cake[]> => {
    return await axiosInstance.get(apiUrl, { params })
        .then(res => res.data)
        .then(data => {
            cakeList$.totalPages.set(data.totalPages);
            return data.cakes.map((cake: CakeDTO) => new Cake(cake));
        });
}

const sendCreateCakeRequest = async (reqBody: CakeFormDTO) => {
    return await axiosInstance.post(apiUrl, reqBody);
}

const sendEditCakeRequest = async (cakeId: string, reqBody: CakeFormDTO) => {
    return await axiosInstance.put(`${apiUrl}/${cakeId}`, reqBody);
}

export { sendCreateCakeRequest, sendEditCakeRequest, sendGetCakeByIdRequest, sendGetCakesRequest };

