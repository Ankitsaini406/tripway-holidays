import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { PiCarProfileLight } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "../styles/components/advanceserchbar.css";

function AdvancedSearchBar() {
    const [fromTerm, setFromTerm] = useState("");
    const [offerFrom, setOfferFrom] = useState("");
    const [toTerm, setToTerm] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [passanger, setPassanger] = useState('Passanger');
    const [carOption, setCarOption] = useState("");
    const [activeLink, setActiveLink] = useState("cabs");
    const [selectedRedio, setSelectedRedio] = useState("one-way");
    const [time, setTime] = useState("");

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedRedio(event.target.value);
    };

    const options = [
        { value: "", label: "Select Car" },
        { value: "saden", label: "Sedan" },
        { value: "suv", label: "Suv" },
        { value: "hatech-back", label: "Hatech Back" },
    ];

    const handleClick = (e, link) => {
        e.preventDefault();
        setActiveLink(link);
    };

    const handleSelectChange = (e) => {
        setCarOption(e.target.value);
    };

    const handleOneWaySearch = () => {
        console.log({
            fromTerm,
            toTerm,
            startDate,
            time,
            carOption,
            passanger,
            offerFrom,
        });
    };

    const handleTwoWaySearch = () => {
        console.log({
            fromTerm,
            destination,
            startDate,
            time,
            carOption,
            passanger,
        })
    }

    return (
        // <div className="slection-main">
        <div className="slection-box">
            <ul className="selection-list">
                <li>
                    <a
                        className={`search-select-button ${activeLink === "cabs" ? "active" : ""
                            }`}
                        href="cabs"
                        onClick={(e) => handleClick(e, "cabs")}
                    >
                        <span className="search-span-icons">
                            <PiCarProfileLight />
                        </span>
                        &nbsp;<span>Cabs</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`search-select-button ${activeLink === "tour-packages" ? "active" : ""
                            }`}
                        href="tour-packages"
                        onClick={(e) => handleClick(e, "tour-packages")}
                    >
                        <span className="search-span-icons">
                            <MdCardTravel />
                        </span>
                        &nbsp;<span>Tour&nbsp;Package</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`search-select-button ${activeLink === "group-tour" ? "active" : ""
                            }`}
                        href="group-tour"
                        onClick={(e) => handleClick(e, "group-tour")}
                    >
                        <span className="search-span-icons">
                            <HiOutlineUserGroup />
                        </span>
                        &nbsp;<span>Group&nbsp;Tour</span>
                    </a>
                </li>
            </ul>

            <div className="advanced-search-bar">
                <div className="radio-option">
                    <div>
                        <input
                            type="radio"
                            value="one-way"
                            checked={selectedRedio === "one-way"}
                            onChange={handleOptionChange}
                        />
                        <label>One&nbsp;Way</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            value="round-trip"
                            checked={selectedRedio === "round-trip"}
                            onChange={handleOptionChange}
                        />
                        <label>Round&nbsp;Trip</label>
                    </div>
                </div>

                <div className="radio-option">
                    <input
                        type="text"
                        placeholder="From"
                        value={fromTerm}
                        onChange={(e) => setFromTerm(e.target.value)}
                        className={`search-input`}
                    />
                    {selectedRedio === "round-trip" ? <></> : <input
                        type="text"
                        placeholder="To"
                        value={toTerm}
                        onChange={(e) => setToTerm(e.target.value)}
                        className="search-input"
                    />}
                </div>
                {selectedRedio === "round-trip" ? <div className="radio-option"><input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={`search-input`}
                /></div> : <></>}
                <div className="radio-option">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        placeholderText="Start Date"
                        className="date-picker"
                    />

                    <input
                        className="time-picker"
                        type="time"
                        value={time}
                        onChange={handleTimeChange}
                    />
                </div>

                <div className="radio-option">
                    <select
                        value={setCarOption}
                        onChange={handleSelectChange}
                        className="select-filter"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Passanger"
                        value={passanger}
                        min="1"
                        max="7"
                        onChange={(e) => setPassanger(e.target.value)}
                        className="search-input"
                    />
                </div>

                {
                    selectedRedio === "round-trip" ? <></> : <input
                        type="text"
                        placeholder="Offer From"
                        value={offerFrom}
                        onChange={(e) => setOfferFrom(e.target.value)}
                        className="search-input"
                    />
                }

                {
                    selectedRedio === "round-trip" ? <button className="search-button" onClick={handleTwoWaySearch}>
                        <FaSearch />
                    </button> : <button className="search-button" onClick={handleOneWaySearch}>
                        <FaSearch />
                    </button>
                }
            </div>
        </div>
        // </div>
    );
}

export default AdvancedSearchBar;
