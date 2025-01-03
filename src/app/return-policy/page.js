import styles from '@/styles/pages/termsAndPrivacy.module.css';

export const metadata = {
    title: "Return and Cancellation Policy",
    description: "Learn about the return and cancellation policies for Tripway Holidays. Information about group tours, roundtrips, refunds, and rescheduling details.",
    keywords: [
        "Return Policy",
        "Cancellation Policy",
        "Tripway Holidays Refunds",
        "Group Tours Cancellation",
        "Roundtrip Modifications",
        "Refund Process",
        "Force Majeure Policy"
    ],
    openGraph: {
        title: "Return and Cancellation Policy",
        description: "Understand the return and cancellation policies of Tripway Holidays, covering group tours, roundtrips, refunds, and more.",
        url: "https://tripwayholidays.in/return-policy",
        type: "website",
        // images: [
        //     {
        //         url: "/return-policy-banner.jpg",
        //         width: 1200,
        //         height: 630,
        //         alt: "Tripway Holidays Return and Cancellation Policy",
        //     }
        // ]
    },
};

function ReturnPolicy() {
    return (
        <div className={styles.mainWidth}>
            <h1 className={styles.h1Tag}>Return and Cancellation Policy</h1>
            <p>At Tripwayholiday Pvt Ltd, we strive to provide a seamless travel experience for our customers. Our policies are designed to ensure transparency and satisfaction for all services, including group tours, roundtrips, and one-way trips.</p>
            <h2 className={styles.h2Tag}>1. Cancellation Policy</h2>
            <h3 className={styles.h3Tag}>For Group Tours:</h3>
            <ul className={styles.ulTag}>
                <p><strong>Cancellation by the Customer:</strong></p>
                <li className={styles.liTag}><strong>15 days or more before the departure date:</strong> 80% refund of the booking amount.</li>
                <li className={styles.liTag}><strong>7-14 days before the departure date:</strong> 50% refund of the booking amount.</li>
                <li className={styles.liTag}><strong>Less than 7 days before the departure date:</strong> No refund.</li>
                <p><strong>Cancellation by the Company:</strong> If the tour is canceled due to unforeseen circumstances, a full refund will be provided or an alternative tour will be offered.</p>
            </ul>
            <h3 className={styles.h3Tag}>For Roundtrips and One-Way Trips:</h3>
            <ul className={styles.ulTag}>
                <p><strong>Cancellation by the Customer:</strong></p>
                <li className={styles.liTag}><strong>24 hours or more before the trip:</strong> 100% refund minus a service charge of [Service Fee Amount].</li>
                <li className={styles.liTag}><strong>Less than 24 hours before the trip:</strong> No refund.</li>
                <p><strong>Cancellation by the Company:</strong> If the trip is canceled by us, customers will receive a full refund or a free rescheduling option.</p>
            </ul>
            <h2 className={styles.h2Tag}>2. Refund Process</h2>
            <ul className={styles.ulTag}>
                <li className={styles.liTag}>Refunds will be processed within 7-10 working days of receiving the cancellation request.</li>
                <li className={styles.liTag}>Refunds will be made to the original payment method used during booking.</li>
            </ul>
            <h2 className={styles.h2Tag}>3. Modifications to Bookings</h2>
            <ul className={styles.ulTag}>
            <li className={styles.liTag}><strong>Group Tours:</strong> Changes in the itinerary or date are subject to availability and may incur additional charges.</li>
            <li className={styles.liTag}><strong>Roundtrips and One-Way Trips:</strong> Rescheduling is allowed up to 12 hours before the trip, subject to availability and a rescheduling fee of [Fee Amount].</li>
            </ul>

            <h2 className={styles.h2Tag}>4. No-Show Policy</h2>
            <ul className={styles.ulTag}>
            <li className={styles.liTag}>If the customer fails to show up for a scheduled trip without prior notice, no refund will be provided.</li>
            </ul>

            <h2 className={styles.h2Tag}>5. Force Majeure</h2>
            <p>In case of unforeseen events (natural disasters, government restrictions, etc.), the company reserves the right to modify or cancel services. Customers will be provided a refund or rescheduling option as applicable.</p>

            <p>For assistance with cancellations, refunds, or modifications, please contact our customer support team at <a className={styles.aTag} href="mailto:tripwayholiday@gmail.com">tripwayholiday@gmail.com</a></p>
        </div>
    )
}

export default ReturnPolicy;