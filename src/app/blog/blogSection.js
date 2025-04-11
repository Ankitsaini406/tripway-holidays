'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatBlogTime, truncateDescription } from '@/utils/formatData';
import { useFilters } from '@/hook/useFilers';
import { usePagination } from '@/hook/usePagination';
import InfiniteScroll from '@/utils/infinitScroll';
import { IoTimeOutline } from "react-icons/io5";
import styles from '@/styles/pages/blogsection.module.css';
import Loading from './blogLoding';

function BlogSection({ blogData, allImages }) {
    const { selectedFilters, filterData, setFilteredItems } = useFilters();
    const { visibleItems, loadMore, reset } = usePagination(5);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null); // Track selected blog

    useEffect(() => {
        if (blogData?.length > 0) {
            setIsLoading(false);
            const filtered = filterData(blogData);
            setFilteredItems(filtered);
            reset(filtered);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogData, selectedFilters]);

    return (
        <>
            <div className='heroSection'>
                <div className='overlay'></div>
                <Image className='heroImage' src='/blogs/blogHero.webp' fill alt='Group Tour Image' priority />
                <h1 className='heroText'>Bringing Stories to Life: Discover Cultures, Share Adventures, and Inspire Together!</h1>
            </div>
            <div className="layout">
                <div className={styles.recentBlogsHeader}>
                    <h2>Recent Blogs</h2>
                </div>
                <div className={styles.blogsection}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <InfiniteScroll
                            loadMore={() => loadMore(filterData(blogData))}
                            hasMore={visibleItems.length < filterData(blogData).length}
                        >
                            {visibleItems.map((item) => (
                                <BlogCard 
                                    key={item.id} 
                                    item={item} 
                                    allImages={allImages} 
                                    selectedBlog={selectedBlog}
                                    setSelectedBlog={setSelectedBlog}
                                />
                            ))}
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </>
    );
}

function BlogCard({ item, allImages, selectedBlog, setSelectedBlog }) {
    const imageData = allImages.find((image) => image.url.includes(item.image)) || {
        url: `/slider/${item.image}`,
        placeholder: null,
    };

    const isSelected = selectedBlog === item.id;
    const isOtherSelected = selectedBlog && selectedBlog !== item.id;

    return (
        <Link href={`/blog/${item.slug}`} onClick={() => setSelectedBlog(item.id)}>
            <div 
                className={`${styles.mainblog} ${isOtherSelected ? styles.grayscale : ''}`} 
                style={{ opacity: isSelected ? 0.5 : 1 }}
            >
                <div className={styles.blogImgBox}>
                    <Image
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`${styles.blogImg} ${isOtherSelected ? styles.grayscale : ''}`}
                        src={imageData.url}
                        alt={item.title}
                        placeholder="blur"
                        blurDataURL={imageData.placeholder}
                        fill
                    />
                </div>
                <div className={styles.blogText}>
                    <div className={styles.blogCatDate}>
                        <p className={styles.blogCategories}>{item.category}</p>
                        <div className={styles.blogCatDate}>
                            <IoTimeOutline style={{ color: 'black', margin: '0 5px' }} />
                            <p className={styles.blogDate}>{formatBlogTime(item.date)}</p>
                        </div>
                    </div>
                    <h3 className={styles.blogTitle}>{item.title}</h3>
                    <p className={styles.blogDescription}>{truncateDescription(item.description, 100)}</p>
                </div>
            </div>
        </Link>
    );
}

export default BlogSection;
