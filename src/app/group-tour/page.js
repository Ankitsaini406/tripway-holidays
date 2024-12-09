'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import InfiniteScroll from '@/utils/infinitScroll';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import { useFetchTourData } from '@/hook/useFetchTourData';
import { useFilters } from '@/hook/useFilers';
import { usePagination } from '@/hook/usePagination';
// import { useSearchParams } from 'next/navigation';
import styles from '@/styles/pages/tourPackage.module.css';
import Loading from './loading';
import FilterLoading from './fileterLoading';

const TourPackages = () => {
    const { tourData, loading, error } = useFetchTourData('group-tours');
    // const searchParams = useSearchParams();
    // const tourOption = searchParams.get('tourOption');
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
                    {
                        loading ? <FilterLoading /> : <Filters
                        filters={extractFilters(tourData)}
                        selectedFilters={selectedFilters}
                        toggleFilter={toggleFilter}
                    />
                    }
                </div>
                <div className={styles.tourBox}>
                    {loading ? (
                        <Loading />
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
            <div className={`${styles.tourImage}`}>
                <Image
                    className={styles.tourImg}
                    data-src={`/tour-image/${item.imageUrl}`}
                    src={`/tour-image/${item.imageUrl}`}
                    alt={item.imageUrl}
                    placeholder="blur"
                    blurDataURL={`/tour-image/${item.imageUrl}`}
                    width={1600}
                    height={900}
                />
            </div>
            <div className={styles.tourDetails}>
                <h2>{item.name}</h2>
                <h6>{item.category}</h6>
                <p>{item.description}</p>
                <Link href={`/group-tour/${item.id}`} className='readMore'>
                    View Tour Details
                </Link>
            </div>
        </div>
    );
}

function extractFilters(data) {
    return [...new Set(data.map((item) => item.category))].sort();
}

export default TourPackages;
