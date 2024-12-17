'use client'

import React, { useState } from "react";
import { addDoc, collection, firestore } from "@/firebase/firebaseConfig";
import { toast } from 'react-toastify';
import styles from "@/styles/pages/termsAndPrivacy.module.css";
import Image from "next/image";

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Add the form data to Firestore
            const docRef = await addDoc(collection(firestore, 'contact-us'), formData);

            toast.success("Message sent successfully!", docRef);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Error sending message. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className={`layout`}>
            <div className={styles.contectBord}>
                <div className={styles.bannerFlex}>
                    <div className={styles.detailsBox}>
                    <h1 className={styles.h1Tag}>Get in Touch</h1>
                    <h4>Want to get in touch? We love to hear from you. Here is how you can reach us.</h4>
                    </div>
                    <div className={styles.backBox}>
                        <div className={styles.imageBox}>
                            <Image 
                            src='/tour-image/4.webp'
                            alt="contact us"
                            placeholder="blur"
                            blurDataURL={`/tour-image/4.webp`}
                            width={500}
                            height={300}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.flexBox}>
                <form className={styles.frombox} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <h2>Contact Us</h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button
                            className={styles.contactButton}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>

                {/* Google Map Embed */}
                <div style={{ width: '100%', height: '400px', margin: 'auto' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d310.23572193367585!2d75.13499593871069!3d27.609144593095422!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca5c6b764d8ad%3A0x4cc2cfdc103c4783!2sWeBrainTech%20Pvt%20Ltd.!5e0!3m2!1sen!2sin!4v1734423685289!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
