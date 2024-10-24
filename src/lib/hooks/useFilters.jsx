import { useState, useEffect } from "react";

export function useFilters(tourOption) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        if (tourOption) setSelectedFilters([tourOption]);
    }, [tourOption]);

    const filterData = (data) =>
        selectedFilters.length > 0
            ? data.filter((item) => selectedFilters.includes(item.category))
            : data;

    const toggleFilter = (category) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(category)
                ? prevFilters.filter((filter) => filter !== category)
                : [...prevFilters, category]
        );
    };

    return { selectedFilters, filteredItems, setFilteredItems, filterData, toggleFilter };
}
