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
            const response = await fetch(
                `/api/google/distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
            );

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status !== "OK") {
                throw new Error("Unable to fetch distance. Please try again.");
            }

            let distText = data?.rows?.[0]?.elements?.[0]?.distance?.text;

            if (!distText) {
                throw new Error("Distance data is unavailable.");
            }

            // Convert Miles to KM if distance is in miles
            let distValue = parseFloat(distText.replace(/[^\d.]/g, ""));
            if (distText.includes("mi")) {
                distValue = (distValue * 1.60934).toFixed(1) + " km";
            } else {
                distValue = distText;
            }

            setDistance(distValue);
        } catch (err) {
            console.error("Fetch Error:", err);
            setError(err.message || "Error fetching data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {process.env.NODE_ENV !== "production" && (
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
            )}
        </>
    );
};

export default DistanceCalculator;
