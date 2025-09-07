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

/**
 * Resets the cake list by clearing existing cakes and resetting pagination.
 * Then fetches the first page of cakes to refresh the list.
 * 
 * @async
 * @function resetCakeList
 * @returns {Promise<void>} Resolves when the cake list has been reset and refetched.
 */
const resetCakeList = async (): Promise<void> => {
    cakeList$.cakes.set([]);
    cakeList$.page.set(1);
    await getCakes();
}

/**
 * Fetches the next page of cakes if there are more pages available.
 *
 * Checks the current page against the total number of pages in the store.
 * If the current page is less than the total pages, it triggers `getCakes()` 
 * to fetch and append the next batch of cakes.
 *
 * @function
 * @returns {void}
 */
const getCakeNextPage = (): void => {
    if (cakeList$.page.get() < cakeList$.totalPages.get()) {
        getCakes();
    }
}

export {
    getCakeNextPage, getCakes, resetCakeList
};

