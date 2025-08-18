import CakeForm from "@/components/forms/CakeForm";
import useCreateCake from "@/hooks/cake/useCreateCake";

const CreateModal = () => {
    const { createCake } = useCreateCake();

    return <CakeForm apiCall={createCake} />;
}

export default CreateModal;