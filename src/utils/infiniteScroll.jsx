import React, { useRef, useCallback } from "react";

const InfiniteScroll = ({ children, loadMore, hasMore }) => {
    const observer = useRef();

    const lastItemRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore, loadMore]
    );

    return (
        <>
            {children && children.length > 0 ? (
                children.map((child, index) => (
                    <div
                        key={index}
                        ref={index === children.length - 1 ? lastItemRef : null}
                    >
                        {child}
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </>
    );
};

export default InfiniteScroll;
