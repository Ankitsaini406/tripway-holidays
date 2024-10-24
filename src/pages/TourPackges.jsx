import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import InfiniteScroll from "../components/infiniteScroll";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import LazyLoadImage from "../components/lazyLoadImage";
import LoadingSpinner from "../components/loadingSpinner";
import { useFetchTourData } from "../lib/hooks/useFetchTourData";
import { useFilters } from "../lib/hooks/useFilters";
// import { useToast } from "../lib/hooks/useToast";
import { usePagination } from "../lib/hooks/usePagination";
import "../styles/pages/layout.css";
import "../styles/pages/tourpackges.css";

function TourPackes() {
    const { tourData, loading, error } = useFetchTourData("data/tour-data.json");
    const location = useLocation();
    const { tourOption } = location.state || {};

    const { selectedFilters, filterData, toggleFilter, setFilteredItems } = useFilters(tourOption);
    const { visibleItems, loadMore, reset } = usePagination(5);
    // const { showToast, resetToast } = useToast();

    useEffect(() => {
        const filtered = filterData(tourData);
        setFilteredItems(filtered);
        reset(filtered);

        // if (tourOption && filtered.length === 0) {
        //     showToast(`Sorry, ${tourOption} tour is not available.`, "error");
        // } else if (tourOption) {
        //     showToast(`Great! The ${tourOption} tour is available.`);
        // } else {
        //     resetToast();
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tourData, selectedFilters, tourOption]);

    return (
        <div className="layout">
            <div className="tour">
                <div className="filters">
                    <Filters filters={extractFilters(tourData)} selectedFilters={selectedFilters} toggleFilter={toggleFilter} />
                </div>
                <div className="tour-box">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : visibleItems.length === 0 ? (
                        <p className="no-data-message">No tours available.</p>
                    ) : (
                        <InfiniteScroll
                            loadMore={() => loadMore(filterData(tourData))}
                            hasMore={visibleItems.length < filterData(tourData).length}
                        >
                            {visibleItems.map((item) => (
                                <TourCard key={item.id} item={item} />
                            ))}
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </div>
    );
}

function Filters({ filters, selectedFilters, toggleFilter }) {
    const [isMobile, setIsMobile] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="filters-container">
            {isMobile ? (
                <button className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    Filters {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            ) : null}
            {(isMobile ? isDropdownOpen : true) && (
                <div className="filters-box">
                    {filters.map((category) => (
                        <div className="filter-item" key={category}>
                            <input
                                type="checkbox"
                                id={`filter-${category}`}
                                checked={selectedFilters.includes(category)}
                                onChange={() => toggleFilter(category)}
                            />
                            <label htmlFor={`filter-${category}`}>{category}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function TourCard({ item }) {
    return (
        <div className="tour-card">
            <LazyLoadImage className="tour-image" src={item.img} alt={item.alt} />
            <div className="tour-details">
                <h3>{item.title}</h3>
                <h6>{item.category}</h6>
                <p>{item.desc}</p>
                <Link to={`/tour/${item.id}`}>Read More</Link>
            </div>
        </div>
    );
}

function extractFilters(data) {
    return [...new Set(data.map((item) => item.category))].sort();
}

export default TourPackes;
