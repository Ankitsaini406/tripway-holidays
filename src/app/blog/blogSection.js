'use client';

import React, { useEffect } from 'react';
import { truncateDescription } from '@/utils/formatData';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useFilters } from '@/hook/useFilers';
import { usePagination } from '@/hook/usePagination';
import styles from '@/styles/pages/blogsection.module.css';
import Image from 'next/image';
import InfiniteScroll from '@/utils/infinitScroll';
import Link from 'next/link';

function BlogSection({ blogData, allImages }) {
    const { selectedFilters, filterData, toggleFilter, setFilteredItems } = useFilters();
    const { visibleItems, loadMore, reset } = usePagination(5);

    useEffect(() => {
        const filtered = filterData(blogData);
        setFilteredItems(filtered);
        reset(filtered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogData, selectedFilters]);

    return (
        <>
            <div className='heroSection'>
                <div className='overlay'></div>
                <Image className='heroImage' src='/slider/slider2.webp' fill alt='Group Tour Image' priority />
                <h1 className='heroText'>Bringing Stories to Life: Discover Cultures, Share Adventures, and Inspire Together!</h1>
            </div>
            <div className="layout">
                <div className={styles.recentBlogsHeader}>
                    <h2>Recent Blogs</h2>
                </div>
                <div className={styles.blogsection}>
                    {
                        visibleItems.length === 0 ? (
                            <p>Loading...</p>
                        ) : (
                            <InfiniteScroll
                                loadMore={() => loadMore(filterData(blogData))}
                                hasMore={visibleItems.length < filterData(blogData).length}
                            >
                                {visibleItems.map((item) => (
                                    <BlogCard key={item.id} item={item} allImages={allImages}></BlogCard>
                                ))}
                            </InfiniteScroll>
                        )
                    }
                </div>
            </div>
        </>
    );
}

function BlogCard({ item, allImages }) {

    const imageData = allImages.find((image) => image.url.includes(item.image)) || {
        url: `/slider/${item.image}`,
        placeholder: null,
    };

    return (
        <Link href={`/blog/${item.slug}`} >
            <div className={styles.mainblog}>
                <div className={styles.blogImgBox}>
                    <Image
                        className={styles.blogImg}
                        data-src={imageData.url}
                        src={imageData.url}
                        alt={item.title}
                        placeholder="blur"
                        blurDataURL={imageData.placeholder}
                        fill
                    />
                </div>
                <div className={styles.blogText}>
                    <div className={styles.blogCatDate}>
                        <p className={styles.blogCategories}>{item.categories}</p>
                        <p className={styles.blogDate}>{item.date}</p>
                    </div>
                    <h3 className={styles.blogTitle}>{item.title}</h3>
                    <p className={styles.blogDescription}>{truncateDescription(item.description, 100)}</p>
                </div>
            </div>
        </Link>
    )
}

function Filters({ filters, selectedFilters, toggleFilter }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 770);
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

function extractFilters(data) {
    return [...new Set(data.map((item) => item.category))].sort();
}

export default BlogSection;
