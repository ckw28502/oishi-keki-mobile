import CakeSort from "@/constants/enum/cakeSort";
import * as yup from "yup";

const getCakesFilterSchema = yup.object({
    nameFilter: yup.string()
        .optional()
        .default(""),
    sort: yup.mixed<CakeSort>()
        .oneOf(Object.values(CakeSort))
        .default(CakeSort.NameASC)
});

type GetCakesFilterFormData = yup.InferType<typeof getCakesFilterSchema>;

export {
    GetCakesFilterFormData, getCakesFilterSchema
};

