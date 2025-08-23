import { sendCreateCakeRequest } from "@/api/cake";
import CreateCakeDTO from "@/dto/cake/createCakeDTO";
import { router } from "expo-router";

const useCreateCake = () => {
    const createCake = async (data: CreateCakeDTO) => {
        const result = await sendCreateCakeRequest(data);
        router.back();
    }

    return {
        createCake
    };
}

export default useCreateCake;