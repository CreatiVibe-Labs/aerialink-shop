import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
      {/* Illustration */}
      <div className="mb-8">
        <Image
          src="/assets/error/error-image.png" // 👉 replace with your image path
          alt="Lost illustration"
          width={350}
          height={300}
          className="mx-auto"
        />
      </div>

      {/* Title */}
      <h1 className="xl:text-[60px] lg:text-[60px] md:text-4xl font-extrabold text-[#666664] mb-2">
        Looks like you are lost.
      </h1>

      {/* Subtitle */}
      <p className="font-extrabold text-lg text-[#666664]">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="bg-primary text-white font-extrabold text-[20px] mt-10 px-14 py-3 rounded-2xl flex items-center justify-center gap-3"
      >
        Go Back To Homepage
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  );
}
