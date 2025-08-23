import CakeSort from "@/constants/enum/cakeSort";
import Cake from "@/models/cake";
import { observable } from "@legendapp/state";

/**
 * Number of cakes per page for pagination.
 */
const CAKE_PAGE_SIZE = 5;

/**
 * Observable store for managing the cake list state.
 *
 * - `cakes`: currently loaded cakes
 * - `page`: current pagination page (starts at 1)
 * - `nameFilter`: filter string to match cake names
 * - `sortParam`: current sorting method (default: NameASC)
 */
const cakeList$ = observable({
    cakes: new Array<Cake>(),
    page: 1,
    totalPages: 0,
    nameFilter: "",
    sortParam: CakeSort.NameASC
});

/**
 * Fully resets the cake list state to defaults.
 *
 * - Clears cakes
 * - Resets page to 1
 * - Resets filter and sort to defaults
 */
const resetList = () => {
    cakeList$.set({
        cakes: [],
        page: 1,
        totalPages: 0,
        nameFilter: "",
        sortParam: CakeSort.NameASC
    });
};

/**
 * Clears only the cakes and resets pagination.
 * Keeps current filters and sort settings intact.
 */
const clearCakes = () => {
    cakeList$.cakes.set([]);
    cakeList$.page.set(1);
};

/**
 * Adds new cakes to the list.
 *
 * @param newCakes - Array of cakes to add
 */
const addCakes = (newCakes: Cake[]) => {
    cakeList$.cakes.set(prev => [...prev, ...newCakes]);
    cakeList$.page.set(cakeList$.page.get() + 1);
};

export {
    addCakes,
    CAKE_PAGE_SIZE,
    cakeList$,
    clearCakes,
    resetList
};

