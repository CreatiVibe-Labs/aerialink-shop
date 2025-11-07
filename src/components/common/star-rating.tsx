import React from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";

interface StarRatingProps {
    rating: number ;        // Required: rating value like 4.7
    totalStars?: number;   // Optional, default 5
    size?: number;         // Optional, icon size, default 23
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    totalStars = 5,
    size = 23,
}) => {
    const stars = Array.from({ length: totalStars }, (_, i) => {
        if (i + 1 <= Math.floor(rating)) {
            return <BiSolidStar key={i} className="text-amber-300" size={size} />;
        } else if (i + 0.5 < rating) {
            return <BiSolidStarHalf key={i} className="text-amber-300" size={size} />;
        } else {
            return <BiStar key={i} className="text-amber-300" size={size} />;
        }
    });

    return <div className="flex gap-1">{stars}</div>;
};
