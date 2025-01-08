
import Image from "next/image";
import styles from "@/styles/pages/blogsection.module.css";

function BlogDetails({ blogData, blurImg }) {

    const imageUrl = process.env.BLOG_URL;

    return (
        <div className="layout">
            {
                blogData ? (
                    <div>
                        <div className={styles.blogSingleImgBox}>
                            <Image
                                className={styles.blogSingleImg}
                                data-src={`${imageUrl}/${blogData.image}`}
                                src={`${imageUrl}/${blogData.image}`}
                                alt={blogData.title}
                                blurDataURL={blurImg}
                                placeholder="blur"
                                fill
                                priority
                            />
                        </div>
                        <div className={styles.blogText}>
                            <div className={styles.blogCatDate}>
                                <p className={styles.blogSingleCategories}>{blogData.categories}</p>
                                <p className={styles.blogSingleDate}>{blogData.date}</p>
                            </div>
                            <h3 className={styles.blogSingleTitle}>{blogData.title}</h3>
                            <p className={styles.blogSingleDescription}>{blogData.description}</p>
                            {blogData.points ? (
                                blogData.points.map((item, index) => {
                                    // Sanitize the bullets data
                                    const sanitizedBullets = Array.isArray(item.bullets) && item.bullets.filter(bullet => bullet.trim() !== "");
                                    return (
                                        <div key={index}>
                                            <h3 className={styles.blogSingleTitle}>{item.point}</h3>
                                            <p className={styles.blogSingleDescription}>{item.detail}</p>
                                            {sanitizedBullets && sanitizedBullets.length > 0 ? (
                                                <ul>
                                                    {sanitizedBullets.map((bullet, bulletIndex) => (
                                                        <li key={bulletIndex} className={styles.blogBullet}>{bullet}</li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                        </div>
                                    );
                                })
                            ) : null}
                            <p className={styles.blogSingleDescription}>{blogData.summary}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default BlogDetails;