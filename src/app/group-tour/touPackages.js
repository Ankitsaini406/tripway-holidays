'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import InfiniteScroll from '@/utils/infinitScroll';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import { useFilters } from '@/hook/useFilers';
import { usePagination } from '@/hook/usePagination';
import styles from '@/styles/pages/tourPackage.module.css';
import Loading from './loading';

function TourPackages({ tourData, allImages }) {
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
                        <Filters
                        filters={extractFilters(tourData)}
                        selectedFilters={selectedFilters}
                        toggleFilter={toggleFilter}
                    />
                    }
                </div>
                <div className={styles.tourBox}>
                    { visibleItems.length === 0 ? (
                        <Loading />
                    ) : (
                        <InfiniteScroll
                            loadMore={() => loadMore(filterData(tourData))}
                            hasMore={visibleItems.length < filterData(tourData).length}
                        >
                            {visibleItems.map((item) => (
                                <TourCard key={item.id} item={item} allImages={allImages} />
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

function TourCard({ item, allImages }) {

    const imageData = allImages.find((image) => image.url.includes(item.imageUrl)) || {
        url: `/tour-image/${item.imageUrl}`,
        placeholder: null,
    };

    return (
        <div className={styles.tourCard}>
            <div className={styles.tourImage}>
                <Image
                    className={styles.tourImg}
                    sizes="(max-width: 400px) 100vw, 200px"
                    data-src={imageData.url}
                    src={imageData.url}
                    alt={item.name}
                    placeholder="blur"
                    blurDataURL={imageData.placeholder}
                    fill
                    priority
                />
            </div>
            <div className={styles.tourDetails}>
                <h1>{item.name}</h1>
                <h4>{item.category}</h4>
                <p>{item.description}</p>
                <Link href={`/group-tour/${item.slug}`} className='readMore'>
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
