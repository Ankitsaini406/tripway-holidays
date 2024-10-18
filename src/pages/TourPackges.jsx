import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../styles/pages/layout.css";
import "../styles/pages/tourpackges.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function TourPackes() {
    const [tourData, setTourData] = useState([]); // Store fetched tour data
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const filters = ["Wildlife", "Adventure", "Leisure", "Trekking", "Spiritual", "Beach", "Heritage"];
    const sortedFilters = filters.sort((a, b) => a.localeCompare(b));

    const location = useLocation();
    const { tourOption } = location.state || {};

    // Fetch tour data from tour-data.json using Axios
    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await axios.get("data/tour-data.json");
                setTourData(response.data);
                setFilteredItems(response.data); 
            } catch (error) {
                console.error("Error fetching tour data:", error);
            }
        };
        fetchTourData();
    }, []);

    // Set initial selected filters based on tourOption
    useEffect(() => {
        if (tourOption) {
            setSelectedFilters([tourOption]);
        }
    }, [tourOption]);

    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            const updatedFilters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(updatedFilters);
        } else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            const tempItems = selectedFilters.flatMap((selectedCategory) =>
                tourData.filter((item) => item.category === selectedCategory)
            );
            setFilteredItems(tempItems);
        } else {
            setFilteredItems(tourData);
        }
    };

    useEffect(() => {
        filterItems();
    }, [selectedFilters, tourData]);

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
                    <TourCard filteredItems={filteredItems} />
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
                    <button
                        className="dropdown-toggle"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="filter-dropdown">
                            Filters {isDropdownOpen ? <FaChevronDown /> : <FaChevronUp />}
                        </div>
                    </button>
                    {isDropdownOpen && (
                        <div className="filters-box">
                            {filters.map((category, idx) => (
                                <div className="filter-item" key={`filter-${idx}`}>
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
                        <div className="filter-item" key={`filter-${idx}`}>
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

export function TourCard({ filteredItems }) {
    return (
        <>
            {filteredItems.map((value) => (
                <div key={value.id} className="tour-card">
                    <img className="tour-image" src={value.img} alt="" />
                    <div className="tour-detalis">
                        <h3>{value.title}</h3>
                        <h6>{value.category}</h6>
                        <p>{value.desc}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default TourPackes;
