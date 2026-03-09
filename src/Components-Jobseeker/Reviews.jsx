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
            <img key={i} src={starIcon} alt="star" className="star-icon-img" />
        ));
    };

    return (
        <>
            <Header />
            <div className="reviews-container">
                <h1 className="reviews-main-title">My Reviews</h1>

                <section className="reviews-overview-card">
                    <h3>Overview</h3>
                    <div className="reviews-stats-grid">
                        <div className="reviews-stat-item">
                            <span className="reviews-label">Average ratings</span>
                            <div className="reviews-rating-value">
                                {stats.average}
                                <div className="stars-value">
                                    {renderStars(5)}
                                </div>
                            </div>
                        </div>
                        <div className="stat-item">
                            <span className="label">Total reviews</span>
                            <div className="stat-number">{stats.total}</div>
                        </div>
                        <div className="stat-item">
                            <span className="label">Application sent</span>
                            <div className="stat-number">{stats.applications}</div>
                        </div>
                    </div>
                </section>

                <div className="reviews-grid">
                    {reviewData.map((review, index) => (
                        <div key={index} className="review-card">
                            <p className="card-label">Latest review</p>
                            <div className="stars-row">
                                {renderStars(review.rating)}
                            </div>
                            <div className="reviewer-info">
                                <span className="reviewer-name">{review.name}</span>
                                <span className="review-date">{review.date}</span>
                            </div>
                            <p className="review-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

