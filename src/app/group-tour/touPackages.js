"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InfiniteScroll from "@/utils/infinitScroll";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import { useFilters } from "@/hook/useFilers";
import { usePagination } from "@/hook/usePagination";
import styles from "@/styles/pages/tourPackage.module.css";
import { truncateDescription } from "@/utils/formatData";

function TourPackages({ tourData }) {
    const { selectedFilters, filterData, toggleFilter, setFilteredItems } =
        useFilters();
    const { visibleItems, loadMore, reset } = usePagination(5);

    const searchParams = useSearchParams();
    const tourOption = searchParams.get("tourOption");
    const selectedModel = searchParams.get("selectedModel");
    const route = useRouter();

    useEffect(() => {
        if (tourOption) {
            toggleFilter(tourOption);
        }
        if (selectedModel) {
            toggleFilter(selectedModel);
        }
    }, [selectedModel, toggleFilter, tourOption]);

    useEffect(() => {
        const filtered = filterData(tourData);
        setFilteredItems(filtered);
        reset(filtered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tourData, selectedFilters]);

    return (
        <>
            <div className="heroSection">
                <div className="overlay"></div>
                <Image
                    className="heroImage"
                    src="/tour-images/tourHero.webp"
                    fill
                    alt="Group Tour Image"
                />
                <h1 className="heroText">
                    Connecting Hearts, Exploring Cultures, and Creating Unforgettable
                    Adventures Together!
                </h1>
            </div>
            <div className="layout">
                <div className={styles.tour}>
                    <div className={styles.filters}>
                        {
                            <Filters
                                filters={extractFilters(tourData)}
                                selectedFilters={selectedFilters}
                                toggleFilter={toggleFilter}
                            />
                        }
                    </div>
                    <div className={styles.tourGrid}>
                        {/* {visibleItems.length === 0 ? (
                            <Loading />
                        ) : ( */}
                        <InfiniteScroll
                            loadMore={() => loadMore(filterData(tourData))}
                            hasMore={visibleItems.length < filterData(tourData).length}
                        >
                            {visibleItems.map((item) => (
                                    <TourCard key={item.id} item={item} route={route} />
                            ))}
                        </InfiniteScroll>
                        {/* )} */}
                    </div>
                </div>
            </div>
        </>
    );
}

function Filters({ filters, selectedFilters, toggleFilter }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 770);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={styles.filtersContainer}>
            {isMobile ? (
                <button
                    className={styles.dropdownToggle}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    Filters {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            ) : null}
            {(isMobile ? isDropdownOpen : true) && (
                <div className={styles.filtersBox}>
                    {filters.map((category) => (
                        <div className={styles.filterItem} key={category}>
                            <input
                                type="checkbox"
                                id={`filter-${category}`}
                                checked={selectedFilters.includes(category)}
                                onChange={() => toggleFilter(category)}
                            />
                            <label htmlFor={`filter-${category}`}>{category}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function TourCard({ item, route }) {
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        route.push(`/group-tour/${item.slug}`);
    }

    // Assuming item.images is the array of images
    // const imageData = item.images.find((image) =>
    //     image.url.includes(item.imageUrl)
    // ) || {
    //     url: `/tour-images/${item.imageUrl}`,
    //     placeholder: null,
    // };

    return (
        <div className={styles.tourCard}>
            <div className={styles.tourImage}>
                <Image
                    className={styles.tourImg}
                    src={`/tour-images/${item.imageUrl}`}
                    alt={item.name}
                    placeholder="blur"
                    onError={() => 'tripway-palceholder.webp'}
                    blurDataURL='/tripway-palceholder.webp'
                    fill
                    priority
                />
            </div>
            <div className={styles.tourDetails}>
                <h4>{item.category}</h4>
                <h1>{item.name}</h1>
                <p>{truncateDescription(item.description)}</p>
                <button
                    onClick={handleSearch}
                    className="readMore"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loadingDots">View Details </span>
                    ) : (
                        "View Details"
                    )}
                </button>
            </div>
        </div>
    );
}

function extractFilters(data) {
    return [...new Set(data.map((item) => item.category))].sort();
}

export default TourPackages;
