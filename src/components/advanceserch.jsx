import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { FaSearch, FaPlus } from "react-icons/fa";
import { PiCarProfileLight } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/components/advanceserchbar.css";

function AdvancedSearchBar() {
    const [activeLink, setActiveLink] = useState("cabs");

    const navigate = useNavigate();

    const handleClick = (e, link) => {
        e.preventDefault();
        setActiveLink(link);
    };

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
                {activeLink === "cabs" && (
                    <CabSerchBar />
                )}

                {activeLink === "tour-packages" && (
                    <TourSearchBar navigate={navigate}/>)}

                {activeLink === "group-tour" && (
                    <GroupSerchBar navigate={navigate}/>)}
            </div>
        </div>
        // </div>
    );
}

export default AdvancedSearchBar;

export function CabSerchBar() {

    const [fromTerm, setFromTerm] = useState("");
    const [offerFrom, setOfferFrom] = useState("");
    const [toTerm, setToTerm] = useState("");
    const [destinations, setDestinations] = useState([""]);
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [passanger, setPassanger] = useState('Passanger');
    const [carOption, setCarOption] = useState("");
    const [selectedRedio, setSelectedRedio] = useState("one-way");
    const [time, setTime] = useState("");

    // Handle adding a new destination input
    const addDestination = () => {
        if (destinations.length < 10) {
            setDestinations([...destinations, ""]);
        }
    };

    // Handle removing a destination input
    const removeDestination = (index) => {
        setDestinations(destinations.filter((_, i) => i !== index));
    };

    // Handle change for each destination input
    const handleDestinationChange = (index, value) => {
        const updatedDestinations = [...destinations];
        updatedDestinations[index] = value;
        setDestinations(updatedDestinations);
    };

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

    const handleMultiWaySearch = () => {
        console.log({
            fromTerm,
            destinations,
            startDate,
            time,
            carOption,
            passanger,
        })
    }

    return (
        <>
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
                <div>
                    <input
                        type="radio"
                        value="multi-city"
                        checked={selectedRedio === "multi-city"}
                        onChange={handleOptionChange}
                    />
                    <label>Multi&nbsp;City</label>
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
                {selectedRedio === "one-way" && <input
                    type="text"
                    placeholder="To"
                    value={toTerm}
                    onChange={(e) => setToTerm(e.target.value)}
                    className="search-input"
                />}
            </div>
            {selectedRedio === "round-trip" && <div className="radio-option"><input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`search-input`}
            /></div>}
            {selectedRedio === "multi-city" && <> <div className="destinations"> {destinations.map((destination, index) => (
                <div key={index} className="destination-input-group">
                    <input
                        type="text"
                        placeholder={`Destination ${index + 1}`}
                        value={destination}
                        onChange={(e) =>
                            handleDestinationChange(index, e.target.value)
                        }
                        className="search-input"
                    />
                    <button
                        type="button"
                        onClick={() => removeDestination(index)}
                        className="remove-button"
                    >
                        X
                    </button>
                </div>
            ))} </div>
                <button
                    type="button"
                    onClick={addDestination}
                    disabled={destinations.length >= 10}
                    className="add-button"
                >
                    <FaPlus /> Add Destination
                </button></>}
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
                    value={carOption}
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
                selectedRedio === "one-way" && <input
                    type="text"
                    placeholder="Offer From"
                    value={offerFrom}
                    onChange={(e) => setOfferFrom(e.target.value)}
                    className="search-input"
                />
            }

            {
                selectedRedio === "round-trip" && <button className="search-button" onClick={handleTwoWaySearch}>
                    <FaSearch />&nbsp;Search
                </button>
            }
            {
                selectedRedio === "one-way" && <button className="search-button" onClick={handleOneWaySearch}>
                    <FaSearch />&nbsp;Search
                </button>
            }

            {
                selectedRedio === "multi-city" && <button className="search-button" onClick={handleMultiWaySearch}>
                    <FaSearch />&nbsp;Search
                </button>
            }
        </>
    )
}

export function TourSearchBar({navigate}) {
    const [tourFromTerm, setTourFromTerm] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [time, setTime] = useState("");
    const [tourOption, setTourOption] = useState("");
    const [passanger, setPassanger] = useState('Passanger');

    const tourOptions = [
        { value: "", label: "Select Tour" },
        { value: "Adventure", label: "Adventure" },
        { value: "Wildlife", label: "Wildlife" },
        { value: "Family Package", label: "Family Package" },
        { value: "Honeymoon Package", label: "Honeymoon Package" }
    ]

    const handleTourChanges = (e) => {
        setTourOption(e.target.value);
    }

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleTourPackage = () => {
        const query = {
            tourFromTerm,
            destination,
            time,
            tourOption,
            passanger,
            startDate: startDate ? startDate.toISOString() : null // Convert date to ISO string if present
        };

        // Use navigate to redirect with state
        navigate('/tour', { state: query });
    };

    return (
        <>
            <div className="radio-option">
                <input
                    type="text"
                    placeholder="From"
                    value={tourFromTerm}
                    onChange={(e) => setTourFromTerm(e.target.value)}
                    className={`search-input`}
                />
            </div>
            <div className="radio-option"><input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`search-input`}
            /></div>
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
                    value={tourOption}
                    onChange={handleTourChanges}
                    className="select-filter"
                >
                    {tourOptions.map((option) => (
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
            <button className="search-button" onClick={handleTourPackage}>
                <FaSearch />&nbsp;Search
            </button>
        </>
    )
}

export function GroupSerchBar({navigate}) {

    const [tourOption, setGroupOption] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const groupOptions = [
        { value: "", label: "Select Tour" },
        { value: "Adventure", label: "Adventure", models: ["Mountain", "Desert", "Ice"] },
        { value: "Wildlife", label: "Wildlife", models: ["Jungle Sfari", "Rain Forest", "Zoo"] },
        { value: "Other", label: "Other" }
    ]

    const handleGroupChanges = (e) => {
        setGroupOption(e.target.value);
        setSelectedModel("");
    }

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    }

    const availbleModels = groupOptions.find((option) => option.value === tourOption)?.models || [];

    const handleGroupPackage = () => {
        console.log({
            tourOption,
            selectedModel,
        })

        const query = {
            tourOption,
            selectedModel
        };

        // Use navigate to redirect with state
        navigate('/tour', { state: query });
    }

    return (
        <>
            <div style={{ display: "flex", gap: "1rem" }}>

                <select
                    value={tourOption}
                    onChange={handleGroupChanges}
                    className="select-filter"
                >
                    {groupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedModel}
                    onChange={handleModelChange}
                    disabled={!tourOption}
                    className="select-filter"
                >
                    <option value="">Select Location</option>
                    {
                        availbleModels.map((model, index) => (
                            <option key={index} value={model}>
                                {model}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button className="search-button" onClick={handleGroupPackage}>
                <FaSearch />&nbsp;Search
            </button></>
    )
}
