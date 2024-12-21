import React from "react";
import DatePicker from "react-datepicker";
import { useClient } from "@/context/UserContext";
import OtpVerification from "@/utils/otpVeriification";
import useCabSearchForm from "@/hook/useCabSerachForm";
import styles from "@/styles/components/advancesearchbar.module.css";

export function CabSearchBar() {
    const { user, signupUserWithEmailAndPassword } = useClient();
    const { formData, activeOtp, correctOtp, enteredOtp, options, setFormData, handleChange, handleMultiCityChange, addDestination, removeDestination, handleSendOtp, handleSubmit, setEnteredOtp } = useCabSearchForm(user, signupUserWithEmailAndPassword);

    return (
        <>
            {activeOtp ? (
                <div>
                    <label style={{ display: 'block', margin: '0 0 15px 0' }} htmlFor="otp">Your OTP for Travel Booking Confirmation</label>
                    <OtpVerification numberOfDigits={6} correctOtp={correctOtp} setEnteredOtp={setEnteredOtp} handleSendOtp={handleSendOtp} />
                    {formData.msg && <p className={styles.errorMessage}>{formData.msg}</p>}
                </div>
            ) : (
                <>
                    <div className={styles.radioOption}>
                        {["one-way", "round-trip", "multi-city"].map((option) => (
                            <div key={option}>
                                <input
                                    name={option}
                                    type="radio"
                                    value={option}
                                    checked={formData.selectedRadio === option}
                                    onChange={() => setFormData((prevData) => ({ ...prevData, selectedRadio: option }))}
                                />
                                <label>{option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, "")}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.radioOption}>
                        <input
                            type="text"
                            name="from"
                            placeholder="From"
                            value={formData.from}
                            onChange={handleChange}
                            className={styles.searchInput}
                            required
                        />
                        {formData.selectedRadio === "one-way" && (
                            <input
                                type="text"
                                name="to"
                                placeholder="To"
                                value={formData.to}
                                onChange={handleChange}
                                className={styles.searchInput}
                                required
                            />
                        )}
                    </div>

                    {formData.selectedRadio === "round-trip" && (
                        <div className={styles.radioOption}>
                            <input
                                type="text"
                                name="destination"
                                placeholder="Destination"
                                value={formData.destination}
                                onChange={handleChange}
                                className={styles.searchInput}
                            />
                        </div>
                    )}

                    {formData.selectedRadio === "multi-city" && (
                        <>
                            <div>
                                {formData.destinations.map((destination, index) => (
                                    <div key={index} style={{ flexDirection: 'row' }} className={styles.radioOption}>
                                        <input
                                            type="text"
                                            placeholder={`Destination ${index + 1}`}
                                            value={destination}
                                            onChange={(e) => handleMultiCityChange(index, e.target.value)}
                                            className={styles.searchInput}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeDestination(index)}
                                            className={styles.removeButton}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addDestination} className={styles.addButton} disabled={formData.destinations.length >= 10}>
                                Add Destination
                            </button>
                        </>
                    )}

                    <div className={styles.radioOption}>
                        <DatePicker
                            selected={formData.startDate}
                            onChange={(date) => setFormData((prevData) => ({ ...prevData, startDate: date }))}
                            className={styles.searchInput}
                            placeholderText="Start Date"
                            required
                        />
                        <input
                            style={{ padding: '0.35rem' }}
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className={styles.searchInput}
                            required
                        />
                    </div>

                    <div className={styles.radioOption}>
                        <select
                            name="carOption"
                            value={formData.carOption}
                            onChange={handleChange}
                            className={styles.searchInput}
                        >
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="passenger"
                            value={formData.passenger}
                            onChange={handleChange}
                            className={styles.searchInput}
                            min="1"
                            max="7"
                            required
                        />
                    </div>

                    <div className={styles.radioOption}>
                        <ContactDetails
                            type='text'
                            name='firstName'
                            value={formData.firstName}
                            handleChange={handleChange}
                            className={styles.searchInput}
                            palceholder='First Name'
                        />
                        <ContactDetails
                            type='text'
                            name='lastName'
                            value={formData.lastName}
                            handleChange={handleChange}
                            className={styles.searchInput}
                            palceholder='Last Name'
                        />
                    </div>

                    <div className={styles.radioOption}>
                        <ContactDetails
                            type='number'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            handleChange={handleChange}
                            className={styles.searchInput}
                            palceholder='Phone Number'
                        />
                        <ContactDetails
                            type='email'
                            name='email'
                            value={formData.email}
                            handleChange={handleChange}
                            className={styles.searchInput}
                            palceholder='Email'
                        />
                    </div>

                    <input
                        type="text"
                        name="offerFrom"
                        placeholder="Offer From"
                        value={formData.offerFrom}
                        onChange={handleChange}
                        className={styles.searchInput}
                    />
                </>
            )}

            {formData.error && <p className={styles.errorMessage}>{formData.error}</p>}

            <button
                className={`${styles.searchButton} ${formData.loading ? 'loadingButton' : styles.searchButton}`}
                onClick={
                    formData.loading
                        ? null
                        : activeOtp
                            ? handleSubmit
                            : handleSendOtp
                }
                type="submit"
                disabled={formData.loading || (activeOtp && enteredOtp !== correctOtp)}
            >
                {formData.loading ? 'Submiting...' : activeOtp ? "Submit" : "Book Now"}
            </button>
        </>
    );
}

export function ContactDetails({ type, name, value, handleChange, className, palceholder }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className={className}
            placeholder={palceholder}
        />
    );
}