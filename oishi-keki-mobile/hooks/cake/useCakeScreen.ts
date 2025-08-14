import { sendGetCakesRequest } from "@/api/cake";
import { GetCakesFilterFormData, getCakesFilterSchema } from "@/schemas/cake/getCakesFilterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const useCakeScreen = () => {
    let page = 1;
    const limit = 5;

    // Initialize react-hook-form with Yup resolver for validation
    const { control, handleSubmit } = useForm<GetCakesFilterFormData>({
        resolver: yupResolver(getCakesFilterSchema),
    });

    const getCakes = async (data: GetCakesFilterFormData) => {
        const params = { page, limit, ...data };
        const result = await sendGetCakesRequest(params);
        page++;
        console.log(result.data);
    }

    const onSubmit = handleSubmit(async (data) => {
        page = 1;
        await getCakes(data);
    });

    return {
        control,
        onSubmit,
        getCakes
    };
}

export default useCakeScreen;