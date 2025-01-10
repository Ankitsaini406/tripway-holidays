import './loading.css';

export default function Loading() {
    return (
        <div className="loading-container">
            {[...Array(10)].map((_, index) => (
                <div key={index} className="blog">
                    <div className="loading-blogImgBox"></div>
                    <div className="loading-blogText"></div>
                </div>
            ))}
        </div>
    );
}
