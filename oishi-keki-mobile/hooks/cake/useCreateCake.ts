import { sendCreateCakeRequest } from "@/api/cake";
import CreateCakeDTO from "@/dto/cake/createCakeDTO";

const useCreateCake = () => {
    const createCake = async (data: CreateCakeDTO) => {
        const result = await sendCreateCakeRequest(data);
    }

    return {
        createCake
    };
}

export default useCreateCake;