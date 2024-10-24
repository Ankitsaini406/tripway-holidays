import { useState } from "react";


function usePagination(itemsPerPage) {

    const [page, setPage] = useState(1);
    const [visibleItems, setVisibleITems] = useState([]);

    const loadMore = (items) => {
        const newItems = items.slice(0, (page + 1) * itemsPerPage);
        setVisibleITems(newItems);
        setPage((prevPage) => prevPage + 1);
    };

    const reset = (items) => {
        setVisibleITems(items.slice(0, itemsPerPage));
        setPage(1);
    };

    return { visibleItems, loadMore, reset };
}

export default usePagination;