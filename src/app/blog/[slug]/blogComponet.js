
import Link from "next/link";
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";
import styles from "@/styles/pages/blogsection.module.css";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { formatBlogTime } from '@/utils/formatData';
import { FaXTwitter } from "react-icons/fa6";
import dynamic from "next/dynamic";
const RecommendedSection = dynamic(() => import('@/utils/Sections').then((mod) => mod.RecommendedSection));
const PermotingSection = dynamic(() => import('@/utils/Sections').then((mod) => mod.PermotingSection));

function BlogDetails({ blogData }) {

    const imageUrl = process.env.BLOG_URL;

    return (
        <div className="layout">
            {
                blogData ? (
                    <div>
                        <div className={styles.blogSingleImgBox}>
                            <Image
                                className={styles.blogSingleImg}
                                src={`${imageUrl}/${blogData.image}`}
                                alt={blogData.title}
                                onError={() => 'tripway-palceholder.webp'}
                                blurDataURL='/tripway-palceholder.webp'
                                placeholder="blur"
                                fill
                                priority
                            />
                        </div>
                        <div className={styles.blogText}>
                            <div className={styles.blogCatDate}>
                                <p className={styles.blogSingleCategories}>{blogData.category}</p>
                                <div className={styles.blogCatDate}>
                                    <IoTimeOutline style={{ color: 'black', margin: '0 5px' }} />
                                    <p className={styles.blogDate}>{formatBlogTime(blogData.date)}</p>
                                </div>
                            </div>
                            <h3 className={styles.blogSingleTitle}>{blogData.title}</h3>
                            <p className={styles.blogSingleDescription}>{blogData.description}</p>
                            <PermotingSection category={blogData.category} />
                            {/* There i get data of all content */}
                            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
                            <PermotingSection category={blogData.category} />
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
                            <RecommendedSection currentSlug={blogData.slug} />
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