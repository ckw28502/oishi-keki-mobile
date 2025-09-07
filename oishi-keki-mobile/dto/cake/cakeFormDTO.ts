/**
 * Data Transfer Object (DTO) for creating a Cake object.
 * Represents the raw data structure sent to the API.
 * 
 * @interface
 */
interface CakeFormDTO {

    /** The name of the cake */
    name: string;

    /** The price of the cake in numbers */
    price: number;
}

export default CakeFormDTO;
