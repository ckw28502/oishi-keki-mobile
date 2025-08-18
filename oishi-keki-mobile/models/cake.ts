import CakeDTO from "@/dto/cake/cakeDTO";

/**
 * Represents a Cake entity with ID, name, and price.
 */
class Cake {
    private _id: string;
    private _name: string;
    private _price: number;

    /**
     * Creates a new Cake instance from a CakeDTO object.
     * @param {CakeDTO} data - The data transfer object containing cake properties.
     */
    constructor(data: CakeDTO) {
        this._id = data.id;
        this._name = data.name;
        this._price = data.price;
    }

    /** @returns {string} The unique identifier of the cake. */
    get id(): string {
        return this._id;
    }

    /** @returns {string} The name of the cake. */
    get name(): string {
        return this._name;
    }

    /**
     * Updates the name of the cake.
     * @param {string} newName - The new name for the cake.
     */
    set name(newName: string) {
        this._name = newName;
    }

    /** @returns {number} The raw price of the cake in numbers. */
    get price(): number {
        return this._price;
    }

    /**
     * @returns {string} The price of the cake formatted as Indonesian Rupiah currency.
     */
    get priceInRupiah(): string {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this._price);
    }

    /**
     * Updates the price of the cake.
     * @param {number} newPrice - The new price for the cake.
     */
    set price(newPrice: number) {
        this._price = newPrice;
    }
}

export default Cake;
