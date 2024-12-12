import AdvancedSearchBar from "../advanceserch";
import HeroSlider from "./heroSlider";
import styles from '@/styles/components/hero.module.css';

const Hero = () => {
    const images = [
        { src: '/slider/slider1.0.jpg', width: 2670, height: 1500 },
        { src: '/slider/slider2.png', width: 2670, height: 1500 },
        { src: '/slider/slider3.png', width: 2670, height: 1500 },
        { src: '/slider/slider4.png', width: 2644, height: 1500 },
        { src: '/slider/slider5.png', width: 2644, height: 1500 },
        { src: '/slider/slider6.png', width: 2644, height: 1500 },
    ];

    return (
        <div className={styles.hero}>
            <HeroSlider images={images} />
            <AdvancedSearchBar className={styles.advancedSearchBar} />
        </div>
    );
};

export default Hero;
