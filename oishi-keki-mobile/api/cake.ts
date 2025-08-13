import GetCakesDTO from "@/dto/cake/GetCakesDTO";
import axiosInstance from "@/utils/axios";

const apiUrl = "/cakes";

const sendGetCakesRequest = async (params: GetCakesDTO) => {
    return await axiosInstance.get(apiUrl, { params });
}

export {
    sendGetCakesRequest
};

