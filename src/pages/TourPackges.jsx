import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/pages/layout.css";
import '../styles/pages/tourpackges.css';
import TourData from "../lib/tour-data";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function TourPackes() {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(TourData);
    const filters = ["Wildlife", "Adventure", "Leisure", "Trekking", "Spiritual", "Beach", "Heritage"];

    const sortedFilters = filters.sort((a, b) => a.localeCompare(b));
    const location = useLocation();
    const { tourOption } = location.state || {};

    // Set initial selected filters based on tourOption
    useEffect(() => {
        if (tourOption) {
            setSelectedFilters([tourOption]);
        }
    }, [tourOption]);

    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            const filters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(filters);
        } else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            let tempItems = selectedFilters.map((selectedCategory) => {
                let temp = TourData.filter((item) => item.category === selectedCategory);
                return temp;
            });
            setFilteredItems(tempItems.flat());
        } else {
            setFilteredItems([...TourData]);
        }
    }

    useEffect(() => {
        filterItems();
    }, [selectedFilters]);

    return (
        <div className="layout">
            <div className="tour">
                <div className="filters">
                    <Filters filters={sortedFilters} selectedFilters={selectedFilters} handleFilterButtonClick={handleFilterButtonClick} />
                </div>
                <div className="tour-box">
                    <TourCard filteredItems={filteredItems} />
                </div>
            </div>
        </div>
    )
}

export function Filters({ filters, selectedFilters, handleFilterButtonClick }) {

    const [isMobile, setIsMobile] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Check screen size to toggle mobile view
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430);
        handleResize(); // Run once initially
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="filters-container">
            {isMobile ? (
                <div className="mobile-filters">
                    <button
                        className="dropdown-toggle"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {isDropdownOpen ? <div className="filter-dropdown">Filters <span><FaChevronDown /></span></div> : <div className="filter-dropdown">Filters <span><FaChevronUp /></span></div>}
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
            {
                filteredItems.map((value) => (
                    <div key={value.id} className="tour-card">
                        <img className="tour-image" src={value.img} alt="" />
                        <div className="tour-detalis">
                            <h3>{value.title}</h3>
                            <h6>{value.category}</h6>
                            <p>{value.desc}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default TourPackes;
