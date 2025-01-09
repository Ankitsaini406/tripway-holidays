
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";
import styles from "@/styles/pages/blogsection.module.css";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

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
                                <div className={styles.blogCatDate}>
                                    <IoTimeOutline style={{ color: 'black', margin: '0 5px' }} />
                                    <p className={styles.blogDate}>{blogData.date}</p>
                                </div>
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
                            <div className={styles.blogWriten}>
                                <div className={styles.socialIcons}>
                                    <>
                                        {blogData.instagram && blogData.instagram.trim() !== "" && (
                                            <Link href={blogData.instagram}>
                                                <FaInstagram />
                                            </Link>
                                        )}
                                        {blogData.facebook && blogData.facebook.trim() !== "" && (
                                            <Link href={blogData.facebook}>
                                                <FaFacebookF />
                                            </Link>
                                        )}
                                        {blogData.linkedin && blogData.linkedin.trim() !== "" && (
                                            <Link href={blogData.linkedin}>
                                                <FaLinkedin />
                                            </Link>
                                        )}
                                        {blogData.x && blogData.x.trim() !== "" && (
                                            <Link href={blogData.x}>
                                                <FaXTwitter />
                                            </Link>
                                        )}
                                    </>
                                </div>
                                {blogData.writenBy && blogData.writenBy.trim() !== "" && <h4>Writen By : {blogData.writenBy}</h4>}
                            </div>
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