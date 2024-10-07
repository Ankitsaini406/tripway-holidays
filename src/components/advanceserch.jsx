import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { PiCarProfileLight } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "../styles/components/advanceserchbar.css";

function AdvancedSearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [activeLink, setActiveLink] = useState('cabs');

    const options = [
        { value: '', label: 'Select Filter' },
        { value: 'destination', label: 'Destination' },
        { value: 'category', label: 'Category' },
        { value: 'priceRange', label: 'Price Range' },
    ];

    const handleClick = (e, link) => {
        e.preventDefault();
        setActiveLink(link);
    };

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSearch = () => {
        console.log({
            searchTerm,
            startDate,
            endDate,
            selectedOption,
        });
    };

    return (
        // <div className="slection-main">
        <div className="slection-box">
            <ul className="selection-list">
                <li>
                    <a
                        className={`search-select-button ${activeLink === 'cabs' ? 'active' : ''}`}
                        href="cabs"
                        onClick={(e) => handleClick(e, 'cabs')}
                    >
                        <span className="search-span-icons">
                            <PiCarProfileLight />
                        </span>
                        &nbsp;<span>Cabs</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`search-select-button ${activeLink === 'tour-packages' ? 'active' : ''}`}
                        href="tour-packages"
                        onClick={(e) => handleClick(e, 'tour-packages')}
                    >
                        <span className="search-span-icons">
                            <MdCardTravel />
                        </span>
                        &nbsp;<span>Tour Package</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`search-select-button ${activeLink === 'group-tour' ? 'active' : ''}`}
                        href="group-tour"
                        onClick={(e) => handleClick(e, 'group-tour')}
                    >
                        <span className="search-span-icons">
                            <HiOutlineUserGroup />
                        </span>
                        &nbsp;<span>Group Tour</span>
                    </a>
                </li>
            </ul>

            <div className="advanced-search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="date-picker"
                />

                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className="date-picker"
                />

                <select value={selectedOption} onChange={handleSelectChange} className="select-filter">
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <button className="search-button" onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
        </div>
        // </div>
    );
}

export default AdvancedSearchBar;
