
import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import styles from '../styles/components/advancesearchbar.module.css';

export function GroupSearchBar() {
    const [tourOption, setTourOption] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const route = useRouter();

    const groupOptions = [
        { value: "", label: "Select Tour" },
        { value: "Adventure", label: "Adventure", models: ["Mountain", "Desert", "Ice"] },
        { value: "Wildlife", label: "Wildlife", models: ["Jungle Safari", "Rain Forest", "Zoo"] },
        { value: "Other", label: "Other" },
    ];

    const availbleModels = groupOptions.find(option => option.value === tourOption)?.models || [];

    const handleSelectChange = (e, setter) => setter(e.target.value);

    const handleGroupPackage = () => {
        const query = { tourOption, selectedModel };
        route.push("/group-tour", { state: query });
    };

    return (
        <>
            <div style={{ display: "flex", gap: "1rem", flexWrap: 'wrap', justifyContent: 'center' }}>
                <select
                    value={tourOption}
                    onChange={(e) => handleSelectChange(e, setTourOption)}
                    className={styles.selectFilter}
                >
                    {groupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
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
            </div>

            <button className={styles.searchButton} onClick={handleGroupPackage}>
                <FaSearch />&nbsp;Search
            </button>
        </>
    );
}