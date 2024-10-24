import { useState } from "react";

export function usePagination(itemsPerPage) {
    const [page, setPage] = useState(1);
    const [visibleItems, setVisibleItems] = useState([]);

    const loadMore = (items) => {
        const newItems = items.slice(0, (page + 1) * itemsPerPage);
        setVisibleItems(newItems);
        setPage((prevPage) => prevPage + 1);
    };

    const reset = (items) => {
        setVisibleItems(items.slice(0, itemsPerPage));
        setPage(1);
    };

    return { visibleItems, loadMore, reset };
}
