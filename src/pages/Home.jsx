import React from "react";
import "../styles/pages/layout.css";
import Hero from "../components/hero";
import Slider from "../components/slider";
import { TopSliderImages } from "../assets/images/images";

function Home() {

    return (
        <div className="layout">
            <Hero />
            <Slider title='Tour Slider' imagesUrl={TopSliderImages}/>
            <Slider title='Group Tour Slider' imagesUrl={TopSliderImages}/>
        </div>
    );
}

export default Home;
