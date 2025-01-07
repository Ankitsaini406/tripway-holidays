"use client";

import React, { useState } from "react";
import { addDoc, collection, firestore } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import styles from "@/styles/pages/termsAndPrivacy.module.css";
import Image from "next/image";

function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
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
            await addDoc(collection(firestore, "contact-us"), formData);
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Error sending message. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div>
            <div className={styles.contectBord}>
                <div className={styles.bannerFlex}>
                    <div className={styles.detailsBox}>
                        <h1 className={styles.h1Tag}>Get in Touch</h1>
                        <h4>
                            Want to get in touch? We love to hear from you. Here is how you
                            can reach us.
                        </h4>
                    </div>
                    <div className={styles.backBox}>
                        <div className={styles.imageBox}>
                            <Image
                                src="/contact.jpg"
                                alt="contact us"
                                placeholder="blur"
                                blurDataURL="/contact.jpg"
                                width={450}
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
                <div style={{ width: "100%", height: "400px", margin: "auto" }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883.8729873834669!2d75.13409962853268!3d27.60927659850874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca5e2416b8d37%3A0x716d3d18c7f0316f!2sTripway%20Holidays!5e0!3m2!1sen!2sin!4v1735880431371!5m2!1sen!2sin"
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
