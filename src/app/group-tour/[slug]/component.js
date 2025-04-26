'use client';

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { FaWindowMinimize } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { MdDoubleArrow } from "react-icons/md";
import useTourUserData from '@/hook/useTourUserData';
import { toast } from 'react-toastify';
import style from '@/styles/pages/authpage.module.css';
import styles from '@/styles/pages/tourDetails.module.css';

export const TripDetails = ({ tour }) => {
    const [activeTab, setActiveTab] = useState('itinerary');
    const [activeBoxes, setActiveBoxes] = useState([]);

    const toggleBox = (boxId) => {
        setActiveBoxes((prevState) =>
            prevState.includes(boxId)
                ? prevState.filter((id) => id !== boxId) // Close the box
                : [...prevState, boxId] // Open the box
        );
    };

    return (
        <>
            <div className={styles.tabButtons}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'itinerary' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('itinerary')}
                >
                    Itinerary
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'inclusions' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('inclusions')}
                >
                    Inclusions&nbsp;/&nbsp;Exclusions
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'tour-information' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('tour-information')}
                >
                    Tour&nbsp;Information
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'need-know' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('need-know')}
                >
                    Need&nbsp;to&nbsp;Know
                </button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === 'itinerary' && (
                    <div className={styles.expenedMain}>
                        {tour.itinerary ?
                            tour.itinerary.map((day, index) => {
                                return (
                                    <div key={index} className={styles.expendBox}>
                                        <div className={styles.location}><SlLocationPin /></div>
                                        <div className={styles.titleFlex} onClick={() => toggleBox(index + 1)}>
                                            <h5>{day.title}</h5>
                                            {activeBoxes.includes(index + 1) ? (
                                                <div className={styles.cireules}><FaWindowMinimize /></div>
                                            ) : (
                                                <div style={{ alignItems: 'center' }} className={styles.cireules}><FiPlus /></div>
                                            )}
                                        </div>
                                        <div className={`${styles.boxContent} ${activeBoxes.includes(index + 1) ? styles.open : styles.close}`}>
                                            {activeBoxes.includes(index + 1) &&
                                                <>
                                                    <h5
                                                        dangerouslySetInnerHTML={{
                                                            __html: day.description && day.description.includes("Mom's Meal Magic")
                                                                ? day.description.replace(
                                                                    "Mom's Meal Magic",
                                                                    "<strong>Mom's Meal Magic</strong>"
                                                                )
                                                                : day.description,
                                                        }}
                                                    />
                                                    {Array.isArray(day.activities) && day.activities.length > 0 ? (
                                                        <div className={styles.descBox}>
                                                            {day.activities.map((item, index) => (
                                                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <div className={styles.arrow}><MdDoubleArrow /></div>
                                                                    <h5 style={{ width: '90%' }}>{item}</h5>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </>
                                            }
                                        </div>
                                    </div>
                                )
                            }) : <p>No Data available</p>
                        }
                    </div>
                )}
                {activeTab === 'inclusions' && (
                    <div className={styles.inclusionsFlex}>
                        <div className={styles.inExboxes}>
                            <h5>Inclusions</h5>
                            <ul className={styles.listGroup}>
                                {tour?.inclusions ? tour.inclusions.map((item, index) => (
                                    <li key={`inclusion-${index}`} className={styles.listGroupItems}>
                                        {item}
                                    </li>
                                )) : <p>There is not any inclusions</p>}
                            </ul>
                        </div>
                        <div className={styles.inExboxes}>
                            <h5>Exclusions</h5>
                            <ul className={styles.listGroup}>
                                {tour?.exclusions ? tour.exclusions.map((item, index) => (
                                    <li key={`exclusion-${index}`} className={styles.listGroupItems}>
                                        {item}
                                    </li>
                                )) : <p>There is not any exclusions</p>}
                            </ul>
                        </div>
                    </div>
                )}
                {activeTab === 'tour-information' && (
                    <div>
                        <ul className={styles.ulList}><li className={styles.liList}>As everyone is becoming a frequent traveller now, we suggest that you make your own travel accessories kit to ensure a stress free holiday.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>Always make sure to carry less and light luggage, use a four wheel small or medium suitcase and please make sure that you are carrying only one suitcase per person. This will ensure that you will travel smartly and without any inconveniences.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>It is also recommended that you have one cross shoulder bag or haversack for your handy needs which will ensure that you are comfortable at the time of sightseeing and also easy for photography during your tour.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>A smart cap/hat and sunglasses are definitely something that you should have in your kit.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>Though Veena World provides all three meals, that is breakfast, lunch, dinner and Veena World treats as per the itinerary, you can carry dry snacks of your choice in small sealed packets for munching during air travel or road journeys.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>If you are travelling during the monsoon or to destinations where it is rainy, please carry a small umbrella or poncho.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>For international tours, please carry a universal adapter for charging your cameras and mobile phones.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>Ensure that your clothing and footwear is suitable for the destination you are travelling to.</li></ul>
                        <h6><i>*Note: Contact to your tour mangaer for more details.</i></h6>
                    </div>
                )}
                {activeTab === 'need-know' && (
                    <div>
                        <span className={styles.spanText}>Things to consider before the trip!</span>
                        <h3 className={styles.nameList}>Weather</h3>
                        <ul className={styles.ulList}><li className={styles.liList}>For detailed Information about weather kindly visit <a target='#' href='https://www.accuweather.com'>www.accuweather.com</a></li></ul>
                        <h3 className={styles.nameList}>Transport</h3>
                        <h4 className={styles.nameList}>Coach Tavel</h4>
                        <ul className={styles.ulList}><li className={styles.liList}>A/C Vehicle Type - Depends upon group size</li></ul>
                        <h3 className={styles.nameList}>Documnets Required for Travel</h3>
                        <ul className={styles.ulList}><li className={styles.liList}>ADULT: Voters ID / Passport / Aadhar Card / Driving Licence</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>CHILD : Passport / Aadhar Card / School ID</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>INFANT: Aadhar Card/ Birth certificate</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>ID card, ID card type and ID card number is mandatory at time of booking, kindly carry the same ID card on tour.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>For NRI and Foreign National Guests alongwith Passport, Valid Indian Visa/ OCI Card/ PIO Card is mandatory.</li></ul>
                        <ul className={styles.ulList}><li className={styles.liList}>Carry one passport size photo.</li></ul>
                    </div>
                )}
            </div>
        </>
    );
};

export const BookingForm = ({ tour, isPastDate, discountPrice }) => {

    const [formData, setFormData] = useState({ userFrom: '', passenger: 1, userCounterCode: '', userPhoneNumber: '', userEmail: '', userName: '', offerFrom: '', });
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const { addTourData, loading, error, success } = useTourUserData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (success) toast.success(success, {
            draggable: true,
            closeOnClick: true,
        });
        if (error) toast.error(error, {
            draggable: true,
            closeOnClick: true,
        });
    }, [success, error]);

    const handleAddTourData = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!formData.userName) validationErrors.userName = "Name is required";
        if (!formData.userPhoneNumber) validationErrors.userPhoneNumber = "Phone Number is required";
        if (!formData.userCounterCode) validationErrors.userCounterCode = "Countery Code is required";
        if (!formData.userEmail) validationErrors.userEmail = "Email is required";
        if (!isCheckboxChecked) validationErrors.checkbox = "You must agree to the terms and conditions";
        if (!formData.passenger || formData.passenger <= 0) validationErrors.passenger = "Number of passengers is required and must be greater than 0";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Show each error in a toast
            Object.values(validationErrors).forEach(msg => {
                toast.error(msg, {
                    draggable: true,
                    closeOnClick: true,
                });
            });
            return;
        }

        try {
            const data = { ...formData, tourName: tour.name, price: tour.discount && tour.discount > 0 ? discountPrice : tour.price, startDate: tour.startDate, isPast: isPastDate };
            await addTourData(data);
            setFormData({ userFrom: '', passenger: '', userPhoneNumber: '', userEmail: '', userName: '', offerFrom: '', });
        } catch (error) {
            console.error("Error adding tour data:", error);
        }
    }

    return (
        <div className={styles.bookingFrom}>
            <h1>Booking Form</h1>
            <h2>{tour.name}</h2>
            <form>
                {isPastDate && <p className='errorMsg'>*Sorry! This tour is currently unavailable for booking. We plan to offer it again within the next 30 days. Fill in your details below to receive a notification when bookings reopen!.</p>}
                <div className={style.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        className={style.authInput}
                        type="text"
                        id="name"
                        value={formData.userName || ''}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        placeholder={'Enter your Name'}
                        required
                    />
                </div>
                {
                    !isPastDate && <div className={style.formGroup}>
                        <label htmlFor="from">From</label>
                        <input
                            className={style.authInput}
                            type="text"
                            id="from"
                            value={formData.userFrom || ''}
                            onChange={(e) => setFormData({ ...formData, userFrom: e.target.value })}
                            placeholder={'Enter your Location'}
                            required
                        />
                    </div>
                }
                <div className={style.formGroup}>
                    <label htmlFor="phonenumber">Phone Number</label>
                    <div className={style.phoneFlex}>
                        <input
                            style={{ width: '100px' }}
                            className={style.authInput}
                            type="text"
                            id="counterCode"
                            value={formData.userCounterCode || ''}
                            onChange={(e) => setFormData({ ...formData, userCounterCode: e.target.value })}
                            placeholder={'Countery Code'}
                            required
                        />
                        <input
                            className={style.authInput}
                            type="text" inputMode="numeric"
                            pattern="[0-9]+"
                            id="phoneNumber"
                            value={formData.userPhoneNumber || ''}
                            onChange={(e) => setFormData({ ...formData, userPhoneNumber: e.target.value })}
                            placeholder={'Enter your Phone Number'}
                            required
                        />
                    </div>
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        className={style.authInput}
                        type="email"
                        id="email"
                        value={formData.userEmail || ''}
                        onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                        placeholder={'Enter your Email'}
                        required
                    />
                </div>
                {
                    !isPastDate && <div className={style.formGroup}>
                        <label htmlFor="passenger">Passengers</label>
                        <input
                            className={style.authInput}
                            type="number"
                            id="passenger"
                            value={formData.passenger || ''}
                            onChange={(e) => setFormData({ ...formData, passenger: e.target.value })}
                            placeholder="Enter number of passengers"
                            required
                        />
                    </div>
                }
                {
                    !isPastDate && <div className={style.formGroup}>
                        <label htmlFor="offerFrom">Offer From</label>
                        <input
                            className={style.authInput}
                            type="text"
                            id="offerFrom"
                            value={formData.offerFrom || ''}
                            onChange={(e) => setFormData({ ...formData, offerFrom: e.target.value })}
                            placeholder="Offer From"
                        />
                    </div>
                }
                <div className={style.formGroup}>
                    <label className="tremCondition">
                        <div>
                            <input
                                type="checkbox"
                                checked={isCheckboxChecked}
                                onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                            />
                        </div>
                        <h4>By proceeding, you agree with our <a className='terms' href="/terms-and-condition" target="_blank">Terms and Condition</a> & <a className='privacy' href="/privacy-policy" target="_blank">Privacy Policy</a></h4>
                    </label>
                </div>
                {errors.checkbox && <p className="errorMsg">{errors.checkbox}</p>}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className={` ${loading ? 'loadingButton' : styles.tourBuybutton}`} onClick={loading ? null : handleAddTourData} type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : isPastDate ? 'Submit Details' : 'Book Now'}
                    </button>
                </div>
            </form>
        </div>
    )
}