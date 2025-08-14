import CakeSort from "@/constants/enum/cakeSort";
import * as yup from "yup";

const getCakesFilterSchema = yup.object({
    nameFilter: yup.string()
        .required(),
    sort: yup.mixed<CakeSort>()
        .oneOf(Object.values(CakeSort))
        .required()
});

type GetCakesFilterFormData = yup.InferType<typeof getCakesFilterSchema>;

export {
    GetCakesFilterFormData, getCakesFilterSchema
};

