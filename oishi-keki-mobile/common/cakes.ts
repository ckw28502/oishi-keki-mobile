import { sendGetCakesRequest } from "@/api/cake";
import { addCakes, CAKE_PAGE_SIZE, cakeList$ } from "@/stores/cakesStore";

/**
 * Fetches a page of cakes from the backend API using the current state
 * from {@link cakeList$}.  
 *
 * - Reads the current page number, page size, name filter, and sort order.  
 * - Sends a request to the backend with these parameters.  
 * - Updates the local store by appending the new cakes via {@link addCakes}.
 *
 * @async
 * @function getCakes
 * @returns {Promise<void>} Resolves when cakes have been fetched and added to the store.
 *
 */
const getCakes = async (): Promise<void> => {
    const params = {
        page: cakeList$.page.get(),
        limit: CAKE_PAGE_SIZE,
        nameFilter: cakeList$.nameFilter.get(),
        sort: cakeList$.sort.get()
    };

    const newCakes = await sendGetCakesRequest(params);
    addCakes(newCakes);
};

export {
    getCakes
};

