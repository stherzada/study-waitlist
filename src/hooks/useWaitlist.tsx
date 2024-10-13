import { useState, useCallback } from 'react';

interface WaitlistData {
    email: string;
    waitlist_id?: number;
    referral_link?: string;
}

interface WaitlistResponse {
    priority: number;
    referral_link: string;
    total_referrals: number;
}

const validateEmail = (email: string) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email)
}

const useWaitList = () => {
    const [waitlistData, setWaitlistData] = useState<WaitlistResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const reset = () => {
        setWaitlistData(null)
    }

    const submitWaitlist = useCallback(async (data: WaitlistData) => {
        setError(null);

        if (!data.email) {
            setError("Please enter your email");
            return;
        }

        if (!validateEmail(data.email)) {
            console.log('aa')
            setError("Please enter a valid email");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://api.getwaitlist.com/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    waitlist_id: 21224,
                    referral_link: window.location.href
                }),
            })

            const responseData = await response.json();
            setWaitlistData(responseData)
        } catch (err) {
            console.error('Error submitting waitlist:', err)
            setError('Something went wrong. Please try again later.')
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        data: waitlistData,
        error,
        loading,
        submit: submitWaitlist,
        reset
    }
}

export default useWaitList