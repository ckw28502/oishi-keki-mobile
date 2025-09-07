import * as yup from "yup";

const cakeSchema = yup.object({
    name: yup.string().required("Nama kue wajib diisi!"),
    price: yup.number()
        .typeError("Harga kue harus angka!")
        .positive("Harga kue harus lebih besar dari 0!")
        .required("Harga kue wajib diisi!")
})

type CakeFormData = yup.InferType<typeof cakeSchema>;

export { CakeFormData, cakeSchema };

