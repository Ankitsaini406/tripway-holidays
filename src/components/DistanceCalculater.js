import { useState } from "react";

const DistanceCalculator = () => {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [distance, setDistance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getDistance = async () => {
        if (!origin || !destination) {
            setError("Please enter both locations.");
            return;
        }

        setLoading(true);
        setError("");
        setDistance(null);

        try {
            // const response = await fetch(`/api/google/distance?origin=${origin}&destination=${destination}`);
            const response = await fetch(`/api/google/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    route: [
                        { country: 'INA', name: origin },
                        { country: 'INA', name: destination }
                    ]
                }),
            });
            const data = await response.json();

            if (data.error) {
                setError(`Error: ${data.error}`);
                return;
            }

            // if (data.status === 200) {
                const dist = data.route.car.distance;
                setDistance(dist);
            // } else {
            //     setError(`Google API Error: ${data.status}`);
            // }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Error fetching data.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {process.env.NODE_ENV == "production" ? null :
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <h2>Google Maps Distance Calculator</h2>
                    <div style={{ marginBottom: "10px" }}>
                        <input
                            type="text"
                            placeholder="Enter origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            style={{ padding: "10px", marginRight: "10px" }}
                        />
                        <input
                            type="text"
                            placeholder="Enter destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            style={{ padding: "10px" }}
                        />
                    </div>

                    <button
                        onClick={getDistance}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#0070f3",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                        }}
                        disabled={loading}
                    >
                        {loading ? "Calculating..." : "Get Distance"}
                    </button>

                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                    {distance && <h3 style={{ marginTop: "20px" }}>Distance: {distance}</h3>}
                </div>
            }
        </>
    );
};

export default DistanceCalculator;
