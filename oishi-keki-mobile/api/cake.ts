import CakeDTO from "@/dto/cake/cakeDTO";
import CreateCakeDTO from "@/dto/cake/createCakeDTO";
import GetCakesDTO from "@/dto/cake/getCakesDTO";
import Cake from "@/models/cake";
import axiosInstance from "@/utils/axios";

const apiUrl = "/cakes";

const sendGetCakesRequest = async (params: GetCakesDTO): Promise<Cake[]> => {
    return await axiosInstance.get(apiUrl, { params })
        .then(res => res.data.cakes)
        .then(cakes => cakes.map((cake: CakeDTO) => new Cake(cake)));
}

const sendCreateCakeRequest = async (reqBody: CreateCakeDTO) => {
    return await axiosInstance.post(apiUrl, reqBody);
}

export {
    sendCreateCakeRequest, sendGetCakesRequest
};

