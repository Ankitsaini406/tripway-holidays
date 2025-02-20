'use client';

import { useState } from 'react';
import styles from '@/styles/components/faqDropdown.module.css';

const FaqDropdown = ({ faqData }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.faqPageContainer}>
            <h2 className={styles.faqTitle}>FAQ&apos;S</h2>
            <div className={styles.faqs}>
                {faqData.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                        <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                            {faq.question}
                            <span className={openIndex === index ? styles.arrowUp : styles.arrowDown}>▼</span>
                        </button>
                        <div className={`${styles.faqAnswer} ${openIndex === index ? styles.show : styles.hide}`}>
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqDropdown;
