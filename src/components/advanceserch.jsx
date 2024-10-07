import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import { CiSun } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "../styles/components/advanceserchbar.css";

function AdvancedSearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    const options = [
        { value: '', label: 'Select Filter' },
        { value: 'destination', label: 'Destination' },
        { value: 'category', label: 'Category' },
        { value: 'priceRange', label: 'Price Range' },
    ];

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
        <div className="slection-box">
            <ul className="slection-list">
                <li>
                    <a className="serch-select-button" href="travel">
                        <span className="serch-span-icons"><MdCardTravel /></span>
                        <span>Travel</span>
                    </a>
                </li>
                <li>
                    <a className="serch-select-button" href="spiritual">
                        <span className="serch-span-icons"><CiSun /></span>
                        <span>Spiritual</span>
                    </a>
                </li>
                <li>
                    <a className="serch-select-button" href="group">
                        <span className="serch-span-icons"><HiOutlineUserGroup /></span>
                        <span>Group</span>
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
    );
}

export default AdvancedSearchBar;
