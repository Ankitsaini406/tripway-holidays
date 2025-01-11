import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/components/advancesearchbar.module.css";

export default function GroupSearchBar() {
    const [tourOption, setTourOption] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const route = useRouter();

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
    const timestamp = Math.floor(Date.now() / 60000);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiPoint}api/category?t=${timestamp}`, {cache: 'no-cache'});
                if (!response.ok) throw new Error("Failed to fetch categories");

                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const availbleModels = categories.find((option) => option.value === tourOption)?.models || [];

    const handleSelectChange = (e, setter) => setter(e.target.value);

    const handleGroupPackage = () => {
        const query = new URLSearchParams();
        if (tourOption) query.set('tourOption', tourOption);
        if (selectedModel) query.set('selectedModel', selectedModel);

        const url = query.toString() ? `/group-tour?${query.toString()}` : `/group-tour`;

        route.push(url);
    };

    return (
        <>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <select
                            value={tourOption}
                            onChange={(e) => handleSelectChange(e, setTourOption)}
                            className={styles.selectFilter}
                        >
                            <option value="">Select Tour</option>
                            {categories.map((option) => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedModel}
                            onChange={(e) => handleSelectChange(e, setSelectedModel)}
                            disabled={!tourOption}
                            className={styles.selectFilter}
                        >
                            <option value="">Select Location</option>
                            {availbleModels.map((model, index) => (
                                <option key={index} value={model}>
                                    {model}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            <button
                className={`${loading ? 'loadingButton' : styles.searchButton}`}
                onClick={handleGroupPackage}
                disabled={loading} // Disable button if loading
            >
                Search
            </button>
        </>
    );
}
