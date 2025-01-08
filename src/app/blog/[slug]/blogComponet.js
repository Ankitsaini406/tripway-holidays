
import Image from "next/image";
import styles from "@/styles/pages/blogsection.module.css";
import { formatBlogTime } from "@/utils/formatData";
import { Timestamp } from "firebase/firestore";

function BlogDetails({ blogData, blurImg }) {

    const imageUrl = process.env.BLOG_URL;
    const formattedDate = formatBlogTime(new Timestamp(blogData.date.seconds, blogData.date.nanoseconds));

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
                                <p className={styles.blogSingleDate}>{formattedDate}</p>
                            </div>
                            <h3 className={styles.blogSingleTitle}>{blogData.title}</h3>
                            <p className={styles.blogSingleDescription}>{blogData.description}</p>
                            {
                                blogData.points ? (
                                    blogData.points.map((item, index) => (
                                        <div key={index}>
                                            <h3>{item.point}</h3>
                                            <p className={styles.blogSingleDescription}>{item.detail}</p>
                                        </div>
                                    ))
                                ) : (
                                    null
                                )
                            }
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