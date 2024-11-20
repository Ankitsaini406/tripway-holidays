'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import InfiniteScroll from '@/utils/infinitScroll';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LazyLoadImage from '@/utils/lazyLoadingImage';
import LoadingSpinner from '@/utils/lodingSpinner';
import { useFetchTourData } from '@/hook/useFetchTourData';
import { useFilters } from '@/hook/useFilers';
import { usePagination } from '@/hook/usePagination';
import styles from '@/styles/pages/tourPackage.module.css';

const TourPackages = () => {
    const { tourData, loading, error } = useFetchTourData('group-tours');
    const { selectedFilters, filterData, toggleFilter, setFilteredItems } = useFilters();
    const { visibleItems, loadMore, reset } = usePagination(5);

    useEffect(() => {
        const filtered = filterData(tourData);
        setFilteredItems(filtered);
        reset(filtered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tourData, selectedFilters]);

    return (
        <div className='layout'>
            <div className={styles.tour}>
                <div className={styles.filters}>
                    <Filters
                        filters={extractFilters(tourData)}
                        selectedFilters={selectedFilters}
                        toggleFilter={toggleFilter}
                    />
                </div>
                <div className={styles.tourBox}>
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <p className={styles.errorMessage}>{error}</p>
                    ) : visibleItems.length === 0 ? (
                        <p className={styles.noDataMessage}>No tours available.</p>
                    ) : (
                        <InfiniteScroll
                            loadMore={() => loadMore(filterData(tourData))}
                            hasMore={visibleItems.length < filterData(tourData).length}
                        >
                            {visibleItems.map((item) => (
                                <TourCard key={item.id} item={item} />
                            ))}
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </div>
    );
}

function Filters({ filters, selectedFilters, toggleFilter }) {
    const [isMobile, setIsMobile] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

function TourCard({ item }) {
    return (
        <div className={styles.tourCard}>
            <LazyLoadImage className={styles.tourImage} src={`https://tripwayholidays.in/tour-image/${item.imageUrl}`} alt={item.alt} />
            <div className={styles.tourDetails}>
                <h3>{item.name}</h3>
                <h6>{item.category}</h6>
                <p>{item.description}</p>
                <Link href={`/group-tour/${item.id}`} className='readMore'>
                    Read More
                </Link>
            </div>
        </div>
    );
}

function extractFilters(data) {
    return [...new Set(data.map((item) => item.category))].sort();
}

export default TourPackages;
