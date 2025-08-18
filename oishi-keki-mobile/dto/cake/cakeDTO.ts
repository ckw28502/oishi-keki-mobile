/**
 * Data Transfer Object (DTO) for a Cake.
 * Represents the raw data structure received from or sent to the API.
 * 
 * @interface
 */
interface CakeDTO {
    /** The unique identifier of the cake */
    id: string;

    /** The name of the cake */
    name: string;

    /** The price of the cake in numbers */
    price: number;
}

export default CakeDTO;
