"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { truncateDescription } from "./formatData";
import styles from "@/styles/components/Section.module.css";

export function PermotingSection({ category }) {
    const [categoryData, setCategoryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
    const imageUrl = process.env.IMAGE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiPoint}api/group-tours/${category}`);

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

    if (isLoading || error || !categoryData) {
        return null;
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

export function RecommendedSection({ currentSlug }) {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
    const imageUrl = process.env.BLOG_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timestamp = Math.floor(Date.now() / 60000);
                const response = await fetch(`${apiPoint}api/blog?t=${timestamp}`, { cache: "no-store" });

                if (!response.ok) {
                    throw new Error(`Failed to fetch category data. : ${response.status}`);
                }

                const data = await response.json();
                // Filter out the current blog
                const filteredBlogs = data.filter((blog) => blog.slug !== currentSlug);

                // Get only 4 blogs
                setBlogs(filteredBlogs.slice(0, 4));
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentSlug]);

    if (isLoading || error) {
        return null;
    }

    return (
        <div className={styles.RecommendedSection}>
            <h2>Recommended Blogs</h2>
            <div className={styles.RecommendGrid}>
                {blogs.map((blog, index) => (
                    <div key={index} className={styles.RecommendedImgBox}>
                        <Image
                            className={styles.RecommendedImg}
                            src={`${imageUrl}${blog.image}`}
                            alt={blog.title}
                            fill
                        />
                        <div className={styles.RecommendedOverlay}>
                            <h4 className={styles.RecommendedTitle}>{blog.title}</h4>
                            <Link
                                href={`/blog/${blog.slug}`}
                                className="readMore"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
