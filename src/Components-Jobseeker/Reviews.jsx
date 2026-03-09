import React from 'react';
import './Reviews.css';
import starIcon from '../assets/Star_icon.png';
import { Header } from "../Components-LandingPage/Header";
import { Footer } from "../Components-LandingPage/Footer";


export const Reviews = () => {
    const stats = {
        average: 4.9,
        total: 72,
        applications: 97
    };

    const reviewData = Array(6).fill({
        name: "Iqura ashish",
        date: "Jan3",
        text: "saraha team was fantastic they left my place spotless and fresh",
        rating: 5
    });

    const renderStars = (count) => {
        return [...Array(count)].map((_, i) => (
            <img key={i} src={starIcon} alt="star" className="rev-dash-star-img" />
        ));
    };

    return (
        <>
            <Header />
            <div className="rev-dash-container">
                <h1 className="rev-dash-main-title">My Reviews</h1>

                <section className="rev-dash-overview-card">
                    <h3 className="rev-dash-overview-heading">Overview</h3>
                    <div className="rev-dash-stats-grid">
                        <div className="rev-dash-stat-item">
                            <span className="rev-dash-label">Average ratings</span>
                            <div className="rev-dash-rating-value">
                                {stats.average}
                                <div className="rev-dash-stars-wrapper">
                                    {renderStars(5)}
                                </div>
                            </div>
                        </div>
                        <div className="rev-dash-stat-item">
                            <span className="rev-dash-label">Total reviews</span>
                            <div className="rev-dash-stat-number">{stats.total}</div>
                        </div>
                        <div className="rev-dash-stat-item">
                            <span className="rev-dash-label">Application sent</span>
                            <div className="rev-dash-stat-number">{stats.applications}</div>
                        </div>
                    </div>
                </section>

                <div className="rev-dash-grid">
                    {reviewData.map((review, index) => (
                        <div key={index} className="rev-dash-card">
                            <p className="rev-dash-card-label">Latest review</p>
                            <div className="rev-dash-stars-row">
                                {renderStars(review.rating)}
                            </div>
                            <div className="rev-dash-reviewer-info">
                                <span className="rev-dash-reviewer-name">{review.name}</span>
                                <span className="rev-dash-review-date">{review.date}</span>
                            </div>
                            <p className="rev-dash-review-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};