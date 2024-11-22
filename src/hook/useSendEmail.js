import { useState } from 'react';

const useSendEmail = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const sendEmail = async ({ email, subject, message }) => {
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, subject, message }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('Email sent successfully!');
            } else {
                setError(result.error || 'Failed to send email');
            }
        } catch (err) {
            setError('An error occurred while sending the email');
        } finally {
            setLoading(false);
        }
    };

    return { sendEmail, loading, success, error };
};

export default useSendEmail;
