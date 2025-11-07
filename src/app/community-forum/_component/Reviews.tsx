'use client';

import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { useState } from "react";
import { StarRating } from "@/components/common/star-rating";
import Image from "next/image";
import { BiStar, BiSolidStar } from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";

export default function CommunityReviews() {
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleCaptchaChange = (token : any) => {
        setCaptchaToken(token);
    };

    const total = 5;
    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState<null | number>(null);

    const reviews = [
        { id: 1, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent?Lorem ipsum dolor sit amet, consectetur adi elit. Praesent?Lorem ipsum dolor sit amet, consectetur adi elit. Praesent?Lorem ipsum dolor sit amet, consectetur adi elit. Praesent?Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 2, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 3, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 4, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 4, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 3.5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 5, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 6, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 7, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 8, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 2, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 9, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 10, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 11, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 4.7, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 12, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 13, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 14, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 4.9, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 15, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 16, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 17, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 4, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 18, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 19, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 5, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
        { id: 20, avatar: '/assets/icons/user-avatar.png', name: 'John Doe', publish_date: '2 weeks ago', rating: 4.9, review: 'Lorem ipsum dolor sit amet, consectetur adi elit. Praesent? ' },
    ];

    const [openPopup, setOpenPopup] = useState(false);

    const count = reviews.length;
    const totalStars = 5;
    const averageRating = reviews.reduce((sum, item) => sum + item.rating, 0) / count;

    const roundedRating = Math.round(averageRating * 10) / 10;

    // Convert to string, remove trailing .0
    const displayRating = roundedRating % 1 === 0 ? `${roundedRating}` : `${roundedRating}`;

    const reviewsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    // Slice reviews for current page
    const currentReviews = reviews.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
    );

    const [formData, setFormData] = useState({
        full_name: "",
        email_address: "",
        review: "",
        rating: 0,
    });

    const [formError, setFormError] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e : any) => {
        e.preventDefault();
        setIsLoading(true);
        setFormData((prev) => ({
            ...prev,

        }));
        console.log("Form Data:", formData);

        setTimeout(() => {
            console.log("Form Data:", formData);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <section className="mt-10">
            <div className="flex items-start justify-between xl:flex-row lg:flex-row md:flex-row flex-col gap-5">
                <div>
                    <p className="text-[#666664] text-xl font-medium">Based on {count} reviews</p>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2"><StarRating rating={Number(displayRating)} totalStars={5} size={23} /></div> <span className="text-[#666664] text-xl font-medium">({displayRating})</span>
                    </div>
                </div>
                <div>
                    <div onClick={() => setOpenPopup(true)} className={`bg-[#98C1A9] text-white border-2 border-[#98C1A9] rounded-xl py-4 min-w-[266px] max-w-[266px] text-center font-medium text-md cursor-pointer transition-all hover:bg-white hover:text-[#98C1A9] capitalize`}>
                        <span>leave a review</span>
                    </div>
                </div>
            </div>
            {/* Reviews Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                {currentReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-[#FFFDFA] rounded-lg p-4 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Image src={review.avatar} width={100} height={100} alt={review.name} className="rounded-full w-12 h-auto object-cover" />
                            <div className="flex flex-col">
                                <span className="font-medium text-[#666664] flex justify-center items-center gap-2 text-md">
                                    {review.name}
                                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3.46332" cy="3.43402" r="2.75238" fill="#666664" />
                                    </svg>
                                </span>
                                <span className="text-xs text-[#666664]">{review.publish_date}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            <StarRating rating={review.rating} totalStars={5} size={23} /> <span className="text-[#666664] text-xl font-medium">({review.rating}/5)</span>
                        </div>
                        <p className="text-gray-700">{review.review}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-2">
                    {/* Previous Arrow */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-3 cursor-pointer"
                        disabled={currentPage === 1}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1484 0.5L3.99844 6.65C3.95061 6.69489 3.91248 6.74911 3.88642 6.80931C3.86036 6.8695 3.84692 6.9344 3.84692 7C3.84692 7.0656 3.86036 7.1305 3.88642 7.19069C3.91248 7.25089 3.95061 7.30511 3.99844 7.35L10.1484 13.5" stroke="#666664" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`min-w-[45px] min-h-[45px] font-semibold text-sm border-1 border-[#98C1A9] rounded-lg transition cursor-pointer ${currentPage === i + 1
                                ? "bg-[#98C1A9] text-white"
                                : ""
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next Arrow */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-3 cursor-pointer"
                        disabled={currentPage === totalPages}
                    >
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.851562 0.5L7.00156 6.65C7.04939 6.69489 7.08752 6.74911 7.11358 6.80931C7.13964 6.8695 7.15308 6.9344 7.15308 7C7.15308 7.0656 7.13964 7.1305 7.11358 7.19069C7.08752 7.25089 7.04939 7.30511 7.00156 7.35L0.851562 13.5" stroke="#666664" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                </div>
            )}
            {/* Popup */}
            {openPopup &&
                <>
                    <div className="background bg-[#666664]/60 fixed top-0 left-0 w-full h-screen z-100"></div>

                    <div className="popupWrapper fixed top-0 left-0 w-full h-screen z-110 overflow-auto flex items-center justify-center py-10">
                        <div className="popupContent relative rounded-lg p-5 bg-[#FFFDFA] shadow-lg max-h-[90vh] overflow-auto">
                            <div onClick={() => setOpenPopup(false)} className="close cursor-pointer absolute top-3 right-3">
                                <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="32.0855" cy="32.0855" r="22.8599" stroke="#999999" strokeWidth="2.40836" />
                                    <path d="M24.0645 40.1072L32.0858 32.0858M40.1072 24.0645L32.0843 32.0858M32.0843 32.0858L24.0645 24.0645M32.0858 32.0858L40.1072 40.1072" stroke="#999999" strokeWidth="5.34757" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <div className="popupBody ">
                                <p className="text-[#585C5A] text-3xl font-medium">Leave a Review</p>
                                <form className="mt-10 flex flex-col gap-5" onSubmit={handleSubmit}>
                                    <div className="flex gap-10 xl:flex-row lg:flex-row flex-col">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="full_name" className="text-black/40">Full Name</label>
                                            <input type="text" onChange={handleChange} className="bg-[#F5F5F5] rounded-lg py-4 px-2 outline-0 xl:min-w-[460px] lg:min-w-[460px] md:min-w-[460px] min-[360px]:min-w-auto w-full" name="full_name" id="full_name" required />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email_address" onChange={handleChange} className="text-black/40">Email Address</label>
                                            <input type="email_address" className="bg-[#F5F5F5] rounded-lg py-4 px-2 outline-0 xl:min-w-[460px] lg:min-w-[460px] md:min-w-[460px] min-[360px]:min-w-auto w-full" name="email_address" id="email_address" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="text-black/40">Select Rating</label>
                                            <div className="flex gap-1 cursor-pointer">
                                                {Array.from({ length: total }, (_, index) => {
                                                    const value = index + 1;
                                                    const isActive = hovered ? value <= hovered : value <= selected;

                                                    return (
                                                        <span
                                                            key={index}
                                                            onClick={() => setSelected(value)}
                                                            onMouseEnter={() => setHovered(value)}
                                                            onMouseLeave={() => setHovered(null)}
                                                        >
                                                            {isActive ? (
                                                                <BiSolidStar className="text-amber-300" size={44} />
                                                            ) : (
                                                                <BiStar className="text-amber-300" size={44} />
                                                            )}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-10 w-full">
                                        <div className="flex flex-col gap-2 w-full">
                                            <label htmlFor="review" onChange={handleChange} className="text-black/40">Review</label>
                                            <textarea className="bg-[#F5F5F5] rounded-lg py-4 px-2 outline-0 xl:min-w-[460px] lg:min-w-[460px] md:min-w-[460px] min-[360px]:min-w-[300px] w-full resize-none" name="review" id="review" rows={5}></textarea>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center xl:flex-row lg:flex-row md:flex-row flex-col gap-5">
                                        <div className="flex flex-col gap-2">
                                            <ReCAPTCHA
                                                sitekey={'6Le14ewrAAAAABhOQ4P5dEMUw8FA4SbwtwvY8k7I'}
                                                onChange={handleCaptchaChange}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className={`min-w-[266px] max-w-[266px] min-h-[60px] max-h-[60px] rounded-lg transition-all border-2 border-[#98C1A9] bg-[#98C1A9] text-white font-medium flex justify-center items-center gap-2 mx-auto
            ${isLoading
                                                        ? "cursor-not-allowed"
                                                        : "cursor-pointer hover:text-[#98C1A9] hover:bg-white"
                                                    }`}
                                            >
                                                {isLoading ? (
                                                    <svg
                                                        className="animate-spin h-5 w-5 text-white hover:text-[#98C1A9]"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                        ></path>
                                                    </svg>
                                                ) : (
                                                    "Post Comment"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }


        </section>
    );
}