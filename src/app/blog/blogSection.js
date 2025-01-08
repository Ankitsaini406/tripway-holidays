import styles from '@/styles/pages/blogsection.module.css';
import { truncateDescription } from '@/utils/formatData';
import InfiniteScroll from '@/utils/infinitScroll';
import Image from 'next/image';

function BlogSection() {

    const blogData = [
        {
            title: 'Taj Mahal, Agra',
            description: 'The Taj Mahal is one of the Seven Wonders of the World. This stunning white marble mausoleum was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal. Located in Agra, Uttar Pradesh, it stands as a symbol of eternal love and architectural brilliance.',
            image: '/slider/slider2.webp',
            categories: 'Heritage',
            date: '2025-01-01',
        },
        {
            title: 'Jaipur, Rajasthan',
            description: 'Known as the “Pink City,” Jaipur is famous for its majestic forts, palaces, and vibrant culture. The Amber Fort, City Palace, and Hawa Mahal are some of the key attractions that give you a glimpse into Rajasthan’s rich history and architectural beauty.',
            image: '/slider/slider6.webp',
            categories: 'History',
            date: '2025-01-02',
        },
        {
            title: 'Goa Beaches',
            description: 'Goa is India’s most popular beach destination. With pristine golden sands, crystal-clear waters, and vibrant nightlife, Goa is the ideal place for relaxation and fun. Popular beaches include Baga, Calangute, and Anjuna, offering everything from water sports to beach parties.',
            image: '/slider/slider3.webp',
            categories: 'Beaches',
            date: '2025-01-03',
        },
        {
            title: 'Kerala Backwaters',
            description: 'Kerala, often referred to as "God’s Own Country," is famous for its serene backwaters. The tranquil boat rides through lush green landscapes and traditional houseboats provide an unforgettable experience. The backwaters of Alleppey and Kumarakom are the highlights of this enchanting destination.',
            image: '/slider/slider4.webp',
            categories: 'Nature',
            date: '2025-01-04',
        },
        {
            title: 'Leh-Ladakh',
            description: 'Leh-Ladakh, located in the northernmost part of India, is a haven for adventure seekers. Surrounded by majestic mountains, crystal-clear lakes, and Buddhist monasteries, it’s a must-visit for trekkers, bikers, and nature lovers. The Pangong Lake and Nubra Valley are top attractions.',
            image: '/slider/slider6.webp',
            categories: 'Adventure',
            date: '2025-01-05',
        },
        {
            title: 'Varanasi, Uttar Pradesh',
            description: 'One of the oldest living cities in the world, Varanasi is a spiritual hub for Hindus. Located on the banks of the River Ganges, the ghats of Varanasi are famous for evening Aarti, religious rituals, and offering an authentic experience of India’s spiritual culture.',
            image: '/slider/slider2.webp',
            categories: 'Spirituality',
            date: '2025-01-06',
        },
        {
            title: 'Ranthambore National Park, Rajasthan',
            description: 'Ranthambore National Park is a famous wildlife sanctuary located in Rajasthan. Known for its population of Bengal tigers, the park also houses a wide variety of wildlife such as leopards, crocodiles, and deer. A safari here offers a thrilling experience for wildlife enthusiasts.',
            image: '/slider/slider6.webp',
            categories: 'Wildlife',
            date: '2025-01-07',
        },
        {
            title: 'Darjeeling, West Bengal',
            description: 'Darjeeling, also known as the “Queen of the Hills,” offers breathtaking views of the Himalayas and is famous for its tea plantations. The iconic Toy Train, Darjeeling Himalayan Railway, and the stunning Kanchenjunga Mountain make it one of the most scenic hill stations in India.',
            image: '/slider/slider3.webp',
            categories: 'Nature',
            date: '2025-01-08',
        },
        {
            title: 'Mysore, Karnataka',
            description: 'Mysore is a city steeped in royal history and known for its grand palace, the Mysore Palace. The city also boasts the famous Chamundi Hill, the Brindavan Gardens, and a rich cultural heritage, making it one of Karnataka’s most beautiful and historic cities.',
            image: '/slider/slider6.webp',
            categories: 'Heritage',
            date: '2025-01-09',
        },
        {
            title: 'Andaman and Nicobar Islands',
            description: 'The Andaman and Nicobar Islands are a tropical paradise with pristine beaches, crystal-clear waters, and diverse marine life. The Havelock Island, Radhanagar Beach, and Cellular Jail in Port Blair are the main attractions. It’s a perfect destination for diving, snorkeling, and island hopping.',
            image: '/slider/slider2.webp',
            categories: 'Beaches',
            date: '2025-01-10',
        }
    ];

    return (
        <>
                    <div className='heroSection'>
                        <div className='overlay'></div>
                        <Image className='heroImage' src='/slider/slider2.webp' fill alt='Group Tour Image' />
                        <h1 className='heroText'>Bringing Stories to Life: Discover Cultures, Share Adventures, and Inspire Together!</h1>
                    </div>
        <div className="layout">
            <div className={styles.blogsection}>
                {blogData.map((blog, index) => (
                    <div key={index} className={styles.mainblog}>
                        <div className={styles.blogImgBox}>
                            <Image
                                src={blog.image}
                                className={styles.blogImg}
                                alt={blog.title}
                                fill
                                />
                        </div>
                        <div className={styles.blogText}>
                            <div className={styles.blogCatDate}>
                                <p className={styles.blogCategories}>{blog.categories}</p>
                                <p className={styles.blogDate}>{blog.date}</p>
                            </div>
                            <h3 className={styles.blogTitle}>{blog.title}</h3>
                            <p className={styles.blogDescription}>{truncateDescription(blog.description, 100)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
                </>
    );
}

export default BlogSection;
