import GetCakesDTO from "@/dto/cake/getCakesDTO";
import axiosInstance from "@/utils/axios";

const apiUrl = "/cakes";

const sendGetCakesRequest = async (params: GetCakesDTO) => {
    return await axiosInstance.get(apiUrl, { params });
}

export {
    sendGetCakesRequest
};

