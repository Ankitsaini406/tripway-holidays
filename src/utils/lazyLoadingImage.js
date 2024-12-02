import Image from "next/image";
import React, { useEffect, useRef } from "react";

function LazyLoadImage({ className, src, alt, imageLength, width, height }) {

    const imageRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entery) => {
                    if (entery.isIntersecting) {
                        const img = entery.target;
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                });
            },
            { threshold: 0.1 }
        );

        imageRefs.current.forEach((img) => {
            if (img) observer.observe(img);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`lazyImageWrapper ${className}`}>
            <Image
                className="lazyImage"
                data-src={src}
                src={src}
                alt={alt}
                ref={(el) => (imageRefs.current[imageLength] = el)}
                placeholder="blur"
                blurDataURL={src}
                layout="intrinsic"
                width={1600}
                height={900}
            />
        </div>
    )
}

export default LazyLoadImage;
