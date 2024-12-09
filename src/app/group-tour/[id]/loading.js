import "./loading.css";

export default function Loading() {
    return (
        <>
            <div className="tourDetails">
                <div className="tourCard">
                    <div className="tourImage"></div>
                    <div className="tourData"></div>
                    <div className="tourDetailsbutton">
                        <div className="tourAllButton">
                        <div className="tourButton"></div>
                        <div className="tourButton"></div>
                        <div className="tourButton"></div>
                        <div className="tourButton"></div>
                        </div>
                        <div className="tourDetailsbuttonDetails"></div>
                    </div>
                </div>
                <div className="bookingForm">
                    <div className="bookingName"></div>
                    <div className="bookingDetails"></div>
                    <div className="booking"></div>
                    <div className="bookingButton"></div>
                </div>
            </div>
        </>
    );
}
