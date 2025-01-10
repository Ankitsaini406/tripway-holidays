"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { truncateDescription } from "./formatData";
import styles from "@/styles/components/permotingSection.module.css";

function PermotingSection({ category }) {
    const [categoryData, setCategoryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
    const imageUrl = process.env.IMAGE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiPoint}api/group-tours/category/${category}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch category data. : ${response.status}`);
                }

                const data = await response.json();
                setCategoryData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [category]);

    // If there is no category data or it's loading, return nothing
    if (isLoading || error || !categoryData) {
        return null; // Don't render anything
    }

    return (
        <div className={styles.PermotingSize}>
            <div className={styles.permotingFlex}>
                <div className={styles.permotingImgBox}>
                    {categoryData?.imageUrl ? (
                        <Image
                            className={styles.permotingImg}
                            src={`${imageUrl}${categoryData.imageUrl}`}
                            alt={categoryData.name}
                            fill
                        />
                    ) : (
                        <div>No image available</div>
                    )}
                </div>
                <div className={styles.permotingSecond}>
                    <h3>{categoryData?.name}</h3>
                    <p>{truncateDescription(categoryData?.description)}</p>
                    <Link href={`/group-tour/${categoryData?.slug}`} className="readMore">BOOK NOW</Link>
                </div>
            </div>
        </div>
    );
}

export default PermotingSection;
