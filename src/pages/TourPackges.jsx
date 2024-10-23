import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "../components/infiniteScroll";
import "../styles/pages/layout.css";
import "../styles/pages/tourpackges.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import LoadingSpiner from "../components/loadingSpiner";
import LazyLoadImage from "../components/lazyLoadImage";

function TourPackes() {
    const [tourData, setTourData] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const location = useLocation();
    const { tourOption } = location.state || {};
    const filters = ["Wildlife", "Adventure", "Leisure", "Trekking", "Spiritual", "Beach", "Heritage"];
    const sortedFilters = filters.sort((a, b) => a.localeCompare(b));
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Fetch tour data from JSON
    useEffect(() => {

            const fetchTourData = async () => {
                try {
                    const response = await axios.get("data/tour-data.json");
                    setTourData(response.data);
                    setFilteredItems(response.data);
                    setVisibleItems(response.data.slice(0, itemsPerPage));
                } catch (error) {
                    console.error("Error fetching tour data:", error);
                }
            };
            fetchTourData();
    }, []);


    // Initialize selected filters based on `tourOption`
    useEffect(() => {
        if (tourOption) setSelectedFilters([tourOption]);
    }, [tourOption]);

    const handleFilterButtonClick = (category) => {
        const updatedFilters = selectedFilters.includes(category)
            ? selectedFilters.filter((el) => el !== category)
            : [...selectedFilters, category];
        setSelectedFilters(updatedFilters);
    };

    const filterItems = () => {
        const filtered = selectedFilters.length > 0
            ? tourData.filter((item) => selectedFilters.includes(item.category))
            : tourData;

        setFilteredItems(filtered);
        setPage(1);
        setVisibleItems(filtered.slice(0, itemsPerPage));
    };

    useEffect(() => {
        filterItems();
    }, [selectedFilters, tourData]);

    const loadMoreItems = () => {
        const nextPage = page + 1;
        const newItems = filteredItems.slice(0, nextPage * itemsPerPage);
        setVisibleItems(newItems);
        setPage(nextPage);
    };

    return (
        <div className="layout">
            <div className="tour">
                <div className="filters">
                    <Filters
                        filters={sortedFilters}
                        selectedFilters={selectedFilters}
                        handleFilterButtonClick={handleFilterButtonClick}
                    />
                </div>
                <div className="tour-box">
                    {visibleItems.length > 0 ? (
                        <InfiniteScroll
                            loadMore={loadMoreItems}
                            hasMore={visibleItems.length < filteredItems.length}
                        >
                            {visibleItems.map((item) => (
                                <TourCard key={item.id} item={item} alt={item.alt} imageLength={visibleItems.length}/>
                            ))}
                        </InfiniteScroll>
                    ) : (
                        <LoadingSpiner />
                    )}
                </div>

            </div>
        </div>
    );
}

export function Filters({ filters, selectedFilters, handleFilterButtonClick }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="filters-container">
            {isMobile ? (
                <div className="mobile-filters">
                    <button className="dropdown-toggle " onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        Filters {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {isDropdownOpen && (
                        <div className="filters-box">
                            {filters.map((category, idx) => (
                                <div className="filter-item" key={idx}>
                                    <input
                                        type="checkbox"
                                        id={`filter-${category}`}
                                        checked={selectedFilters.includes(category)}
                                        onChange={() => handleFilterButtonClick(category)}
                                    />
                                    <label htmlFor={`filter-${category}`}>{category}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="filters-box">
                    {filters.map((category, idx) => (
                        <div className="filter-item" key={idx}>
                            <input
                                type="checkbox"
                                id={`filter-${category}`}
                                checked={selectedFilters.includes(category)}
                                onChange={() => handleFilterButtonClick(category)}
                            />
                            <label htmlFor={`filter-${category}`}>{category}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function TourCard({ item, alt, imageLength }) {
    return (
        <div className="tour-card">
            <LazyLoadImage className="tour-image" src={item.img} alt={alt} imageLength={imageLength}/>
            <div className="tour-details">
                <div>
                <h3>{item.title}</h3>
                <h6>{item.category}</h6>
                <p>{item.desc}</p>
                </div>
                <Link className="read-more" key={item.id} to={`/tour/${item.id}`}>Read More</Link>
            </div>
        </div>
    );
}

export default TourPackes;
