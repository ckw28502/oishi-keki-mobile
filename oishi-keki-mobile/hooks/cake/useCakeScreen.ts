import { sendGetCakesRequest } from "@/api/cake";
import GetCakesDTO from "@/dto/cake/getCakesDTO";

const useCakeScreen = () => {
    const getCakes = async (params: GetCakesDTO) => {
        const result = await sendGetCakesRequest(params);
        console.log(result.data);
    }

    return {
        getCakes
    };
}

export default useCakeScreen;