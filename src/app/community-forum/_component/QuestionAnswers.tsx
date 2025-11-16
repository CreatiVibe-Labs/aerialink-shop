// src/components/CommunityQuestionsAnswers.tsx
"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import api from "@/lib/api"; // ← Tumhara axios instance
import { useCategory } from "@/contexts/category-context";
import { log } from "three/src/nodes/TSL.js";
import { useProfile } from "@/contexts/profile-context";
import toast, { Toaster } from "react-hot-toast";
import LoginAlertModal from "@/components/home/right-section/components/loginAlert";

interface ForumMessage {
  id: number;
  product_id: number;
  user_id: number;
  message: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  user_liked?: boolean;
  user_disliked?: boolean;
  likes_count: number;
  dislikes_count: number;
  user: {
    id: number;
    name: string;
    profile_photo_url: string;
  };
  replies: ForumMessage[];
}

interface Props {
  selectedProduct: string | number;
}

export default function CommunityQuestionsAnswers({ selectedProduct }: Props) {
  const questionFormRef = useRef<HTMLFormElement>(null);
  const { user } = useProfile();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [questions, setQuestions] = useState<ForumMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const parentsPerPage = 3;

  const [formHeading, setFormHeading] = useState("Ask a Question");
  const [parentId, setParentId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    comments: "",
    parent_id: parentId,
  });

  // Auto-fill form data if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user.name || "",
        email_address: (user as any).email || "",
      }));
    }
  }, [user]);

  // Helper function to normalize message data with server-provided counts
  const normalizeMessage = (msg: any): ForumMessage => ({
    ...msg,
    user_liked: msg.user_liked ?? false,
    user_disliked: msg.user_disliked ?? false,
    // Use server-provided counts
    likes_count: msg.likes_count ?? 0,
    dislikes_count: msg.dislikes_count ?? 0,
    replies: msg.replies ? msg.replies.map(normalizeMessage) : [],
  });

  // Fetch questions using axios
  useEffect(() => {
    if (!selectedProduct) return;

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${selectedProduct}/forum`);
        if (res.data.success) {
          console.log(res.data);

          // Normalize all messages
          const normalizedData = res.data.data.map(normalizeMessage);
          setQuestions(normalizedData);
        } else {
          setError("Failed to load questions");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedProduct]);

  // Handle reply
  const handleReply = (id: number, text: string) => {
    setParentId(id);
    setReplyMessage(text);
    setFormHeading("Reply to this comment");
    questionFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit using axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!selectedProduct || posting) return;

    setPosting(true);
    setError("");

    const formDataToSend = {
      name: formData.full_name,
      email: formData.email_address,
      message: formData.comments,
      parent_id: parentId,
    }

    try {
      const res = await api.post(
        `/products/${selectedProduct}/forum/question`,
        formDataToSend
      );

      if (res.data.success) {
        const newReply = res.data.data;

        setQuestions((prev) => {
          if (!parentId) {
            return [{ ...newReply, user, replies: [] }, ...prev];
          }

          const addReply = (items: ForumMessage[]): ForumMessage[] =>
            items.map((q) => {
              if (q.id === parentId) {
                return {
                  ...q,
                  replies: [...q.replies, { ...newReply, user, replies: [] }],
                };
              }
              return { ...q, replies: addReply(q.replies) };
            });

          return addReply(prev);
        });

        // Show success toast
        toast.success(parentId ? "Reply posted successfully!" : "Question posted successfully!");

        { console.log({ user }) }

        // Reset form
        setFormData({
          full_name: user ? user.name || "" : "",
          email_address: user ? (user as any).email || "" : "",
          comments: "",
          parent_id: null
        });
        setParentId(null);
        setFormHeading("Ask a Question");
      } else {
        const errorMsg = res.data.message || "Failed to post";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to post. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setPosting(false);
    }
  };

  // Handle Like
  const handleLike = async (messageId: number) => {
    try {
      if (!user) {
        setShowLoginModal(true);
        return;
      }

      const message = findMessageById(questions, messageId);
      if (!message) return;

      const endpoint = message.user_liked ? `/forum/${messageId}/unlike` : `/forum/${messageId}/like`;
      const res = await api.post(endpoint);

      if (res.data.success) {
        setQuestions((prev) => updateMessageLikeStatus(prev, messageId, !message.user_liked, !!message.user_disliked));
        toast.success(message.user_liked ? "Like removed" : "Liked!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to like");
    }
  };

  // Handle Dislike
  const handleDislike = async (messageId: number) => {
    try {
      if (!user) {
        setShowLoginModal(true);
        return;
      }

      const message = findMessageById(questions, messageId);
      if (!message) return;

      const endpoint = message.user_disliked ? `/forum/${messageId}/undislike` : `/forum/${messageId}/dislike`;
      const res = await api.post(endpoint);

      if (res.data.success) {
        setQuestions((prev) => updateMessageDislikeStatus(prev, messageId, !message.user_disliked, !!message.user_liked));
        toast.success(message.user_disliked ? "Dislike removed" : "Disliked!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to dislike");
    }
  };

  // Helper function to find message by ID
  const findMessageById = (messages: ForumMessage[], id: number): ForumMessage | null => {
    for (const msg of messages) {
      if (msg.id === id) return msg;
      const found = findMessageById(msg.replies, id);
      if (found) return found;
    }
    return null;
  };

  // Helper function to update like status
  const updateMessageLikeStatus = (
    messages: ForumMessage[],
    id: number,
    liked: boolean,
    wasDisliked: boolean
  ): ForumMessage[] => {
    
    return messages.map((msg) => {
      
      if (msg.id === id) {
        const newLikesCount = liked 
          ? msg.likes_count + 1 
          : Math.max(msg.likes_count - 1, 0);
        
        const newDislikesCount = liked && wasDisliked 
          ? Math.max(msg.dislikes_count - 1, 0) 
          : msg.dislikes_count;
        
        return {
          ...msg,
          user_liked: liked,
          user_disliked: liked && wasDisliked ? false : msg.user_disliked,
          likes_count: newLikesCount,
          dislikes_count: newDislikesCount,
        };
      }
      
      return { ...msg, replies: updateMessageLikeStatus(msg.replies, id, liked, wasDisliked) };
    });
  };

  // Helper function to update dislike status
  const updateMessageDislikeStatus = (
    messages: ForumMessage[],
    id: number,
    disliked: boolean,
    wasLiked: boolean
  ): ForumMessage[] => {
    return messages.map((msg) => {
      if (msg.id === id) {
        const newDislikesCount = disliked 
          ? msg.dislikes_count + 1 
          : Math.max(msg.dislikes_count - 1, 0);
        
        const newLikesCount = disliked && wasLiked 
          ? Math.max(msg.likes_count - 1, 0) 
          : msg.likes_count;
        
        return {
          ...msg,
          user_disliked: disliked,
          user_liked: disliked && wasLiked ? false : msg.user_liked,
          dislikes_count: newDislikesCount,
          likes_count: newLikesCount,
        };
      }
      return { ...msg, replies: updateMessageDislikeStatus(msg.replies, id, disliked, wasLiked) };
    });
  };

  // Pagination
  const topLevel = questions.filter((q) => q.parent_id === null);
  const totalPages = Math.ceil(topLevel.length / parentsPerPage);
  const paginated = topLevel.slice(
    (currentPage - 1) * parentsPerPage,
    currentPage * parentsPerPage
  );

  // Recursive replies
  const renderReplies = (replies: ForumMessage[], level = 1) => {
    if (!replies.length) return null;

    return replies.map((reply) => (
      <div
        key={reply.id}
        className={`xl:p-5 lg:p-5 md:p-5 min-[360px]:p-2 rounded-xl border mt-5 bg-white`}
      >
        <div className="flex items-center gap-3 mb-2">
          <Image
            src={`/users.png`}
            width={100}
            height={100}
            alt={reply.user.name}
            className="rounded-full w-12 h-auto object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-[#666664] flex justify-center items-center gap-2 text-md">
              {reply.user.name}
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                <circle cx="3.46332" cy="3.43402" r="2.75238" fill="#666664" />
              </svg>
            </span>
            <span className="text-xs text-[#666664]">
              {new Date(reply.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <p className="text-[#666664] text-lg">{reply.message}</p>

        <div className="flex xl:flex-row lg:flex-row md:flex-row min-[360px]:flex-col gap-5 xl:justify-between lg:justify-between md:justify-between min-[360px]:justify-start mt-5 mb-2">
          <div className="likeDislike flex gap-5">
            <span
              onClick={() => handleLike(reply.id)}
              className={`transition-all border-1 py-2 min-w-[100px] w-full rounded-xl cursor-pointer flex justify-center items-center gap-2 font-medium text-sm ${reply.user_liked ? 'border-[#98C1A9] bg-[#98C1A9] text-white' : 'border-[#98C1A9] text-[#666664]'
                }`}
            >
              <svg width="20" height="20" viewBox="0 0 14 15" fill="none">
                <g clipPath="url(#clip0_3159_16598)">
                  <path
                    d="M3.37109 6.74674L5.91109 2.68674C6.00953 2.52627 6.14785 2.39403 6.31259 2.3029C6.47732 2.21177 6.66284 2.16486 6.85109 2.16674V2.16674C6.99935 2.16139 7.14718 2.18581 7.28584 2.23857C7.4245 2.29132 7.55118 2.37134 7.65839 2.47388C7.7656 2.57643 7.85116 2.69943 7.91003 2.83561C7.96889 2.97179 7.99985 3.11839 8.00109 3.26674V6.17674H12.3911C12.5533 6.182 12.7126 6.22154 12.8584 6.29275C13.0043 6.36396 13.1334 6.46524 13.2373 6.58992C13.3412 6.7146 13.4175 6.85987 13.4613 7.01616C13.505 7.17245 13.5152 7.33623 13.4911 7.49674L12.6911 12.6567C12.657 12.9325 12.5233 13.1863 12.3152 13.3705C12.1071 13.5546 11.839 13.6564 11.5611 13.6567H5.00109C4.68881 13.658 4.38058 13.586 4.10109 13.4467L3.38109 13.0867"
                    stroke={reply.user_liked ? "white" : "#666664"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.37109 6.74707V13.0571"
                    stroke={reply.user_liked ? "white" : "#666664"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 6.74707H3.37V13.0571H1C0.867392 13.0571 0.740215 13.0044 0.646447 12.9106C0.552678 12.8169 0.5 12.6897 0.5 12.5571V7.24707C0.5 7.11446 0.552678 6.98729 0.646447 6.89352C0.740215 6.79975 0.867392 6.74707 1 6.74707V6.74707Z"
                    stroke={reply.user_liked ? "white" : "#666664"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3159_16598">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0 0.896484)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {reply.likes_count}
            </span>
            <span
              onClick={() => handleDislike(reply.id)}
              className={`transition-all border-1 py-2 min-w-[100px] w-full rounded-xl cursor-pointer flex justify-center items-center gap-2 font-medium text-sm ${reply.user_disliked ? 'border-[#98C1A9] bg-[#98C1A9] text-white' : 'border-[#98C1A9] text-[#666664]'
                }`}
            >
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
                <g clipPath="url(#clip0_3159_23215)">
                  <path
                    d="M11.1641 9.04673L8.62406 13.1067C8.52562 13.2672 8.3873 13.3994 8.22257 13.4906C8.05784 13.5817 7.87231 13.6286 7.68406 13.6267C7.5358 13.6321 7.38797 13.6077 7.24931 13.5549C7.11065 13.5022 6.98398 13.4221 6.87677 13.3196C6.76956 13.217 6.68399 13.094 6.62513 12.9579C6.56627 12.8217 6.5353 12.6751 6.53406 12.5267V9.61673H2.14406C1.98185 9.61147 1.82258 9.57194 1.67674 9.50072C1.5309 9.42951 1.40178 9.32823 1.29788 9.20355C1.19398 9.07887 1.11765 8.93361 1.0739 8.77731C1.03015 8.62102 1.01999 8.45724 1.04406 8.29673L1.84406 3.13673C1.87819 2.86097 2.01185 2.60717 2.21994 2.42302C2.42802 2.23888 2.6962 2.13707 2.97406 2.13673H9.53406C9.84634 2.13551 10.1546 2.20743 10.4341 2.34673L11.1541 2.70673"
                    stroke={reply.user_disliked ? "white" : "#666664"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.1641 9.04633V2.73633"
                    stroke={reply.user_disliked ? "white" : "#666664"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5352 2.73633H11.1652V9.04633H13.5352C13.6678 9.04633 13.7949 8.99365 13.8887 8.89988C13.9825 8.80611 14.0352 8.67894 14.0352 8.54633V3.23633C14.0352 3.10372 13.9825 2.97654 13.8887 2.88277C13.7949 2.78901 13.6678 2.73633 13.5352 2.73633V2.73633Z"
                    stroke={reply.user_disliked ? "white" : "#666664"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3159_23215">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="matrix(-1 0 0 1 14.5352 0.896484)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {reply.dislikes_count}
            </span>
          </div>
          <span
            onClick={() => handleReply(reply.id, reply.message)}
            className="communityReply transition-all border-1 border-[#98C1A9] py-2 min-w-[120px] max-w-[120px] w-full rounded-xl cursor-pointer flex justify-center items-center gap-2 text-[#666664] font-medium text-sm"
          >
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
              <g clipPath="url(#clip0_3159_15870)">
                <path
                  d="M4.31641 7.89648C4.59255 7.89648 4.81641 7.67263 4.81641 7.39648C4.81641 7.12034 4.59255 6.89648 4.31641 6.89648C4.04026 6.89648 3.81641 7.12034 3.81641 7.39648C3.81641 7.67263 4.04026 7.89648 4.31641 7.89648Z"
                  stroke="#666664"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.56641 7.89648C7.84255 7.89648 8.06641 7.67263 8.06641 7.39648C8.06641 7.12034 7.84255 6.89648 7.56641 6.89648C7.29026 6.89648 7.06641 7.12034 7.06641 7.39648C7.06641 7.67263 7.29026 7.89648 7.56641 7.89648Z"
                  stroke="#666664"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8164 7.89648C11.0925 7.89648 11.3164 7.67263 11.3164 7.39648C11.3164 7.12034 11.0925 6.89648 10.8164 6.89648C10.5403 6.89648 10.3164 7.12034 10.3164 7.39648C10.3164 7.67263 10.5403 7.89648 10.8164 7.89648Z"
                  stroke="#666664"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.56641 13.3965L0.566406 14.3965L1.56641 11.3965V2.39648C1.56641 2.13127 1.67176 1.87691 1.8593 1.68938C2.04684 1.50184 2.30119 1.39648 2.56641 1.39648H12.5664C12.8316 1.39648 13.086 1.50184 13.2735 1.68938C13.461 1.87691 13.5664 2.13127 13.5664 2.39648V12.3965C13.5664 12.6617 13.461 12.9161 13.2735 13.1036C13.086 13.2911 12.8316 13.3965 12.5664 13.3965H4.56641Z"
                  stroke="#666664"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3159_15870">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(0.0664062 0.896484)"
                  />
                </clipPath>
              </defs>
            </svg>
            Reply ({reply.replies.length})
          </span>
        </div>

        {renderReplies(reply.replies, level + 1)}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-[#666664]">Loading questions...</p>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" />
      {/* Questions List */}
      {paginated.length === 0 ? (
        <div className="text-center py-16 px-5">
          <div className="flex flex-col items-center gap-4">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#98C1A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#98C1A9" strokeWidth="2" />
            </svg>
            <h3 className="text-xl font-semibold text-[#666664]">No Questions Yet</h3>
            <p className="text-[#666664] text-base max-w-md">
              Be the first to ask a question about this product! Our community is here to help.
            </p>
          </div>
        </div>
      ) : (
        paginated.map((q) => (
          <div
            key={q.id}
            className="xl:p-5 lg:p-5 md:p-5 min-[360px]:p-2 rounded-xl mt-10 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] bg-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={`/users.png`}
                width={100}
                height={100}
                alt={q.user.name}
                className="rounded-full w-12 h-auto object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-[#666664] flex justify-center items-center gap-2 text-md">
                  {q.user.name}
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                    <circle
                      cx="3.46332"
                      cy="3.43402"
                      r="2.75238"
                      fill="#666664"
                    />
                  </svg>
                </span>
                <span className="text-xs text-[#666664]">
                  {new Date(q.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <p className="text-[#666664] text-lg">{q.message}</p>

            <div className="flex xl:flex-row lg:flex-row md:flex-row min-[360px]:flex-col gap-5 xl:justify-between lg:justify-between md:justify-between min-[360px]:justify-start mt-5 mb-2">
              <div className="likeDislike flex gap-5">
                <span
                  onClick={() => handleLike(q.id)}
                  className={`transition-all border-1 py-2 min-w-[100px] w-full rounded-xl cursor-pointer flex justify-center items-center gap-2 font-medium text-sm ${q.user_liked ? 'border-[#98C1A9] bg-[#98C1A9] text-white' : 'border-[#98C1A9] text-[#666664]'
                    }`}
                >
                  <svg width="20" height="20" viewBox="0 0 14 15" fill="none">
                    <g clipPath="url(#clip0_3159_16598)">
                      <path
                        d="M3.37109 6.74674L5.91109 2.68674C6.00953 2.52627 6.14785 2.39403 6.31259 2.3029C6.47732 2.21177 6.66284 2.16486 6.85109 2.16674V2.16674C6.99935 2.16139 7.14718 2.18581 7.28584 2.23857C7.4245 2.29132 7.55118 2.37134 7.65839 2.47388C7.7656 2.57643 7.85116 2.69943 7.91003 2.83561C7.96889 2.97179 7.99985 3.11839 8.00109 3.26674V6.17674H12.3911C12.5533 6.182 12.7126 6.22154 12.8584 6.29275C13.0043 6.36396 13.1334 6.46524 13.2373 6.58992C13.3412 6.7146 13.4175 6.85987 13.4613 7.01616C13.505 7.17245 13.5152 7.33623 13.4911 7.49674L12.6911 12.6567C12.657 12.9325 12.5233 13.1863 12.3152 13.3705C12.1071 13.5546 11.839 13.6564 11.5611 13.6567H5.00109C4.68881 13.658 4.38058 13.586 4.10109 13.4467L3.38109 13.0867"
                        stroke={q.user_liked ? "white" : "#666664"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.37109 6.74707V13.0571"
                        stroke={q.user_liked ? "white" : "#666664"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 6.74707H3.37V13.0571H1C0.867392 13.0571 0.740215 13.0044 0.646447 12.9106C0.552678 12.8169 0.5 12.6897 0.5 12.5571V7.24707C0.5 7.11446 0.552678 6.98729 0.646447 6.89352C0.740215 6.79975 0.867392 6.74707 1 6.74707V6.74707Z"
                        stroke={q.user_liked ? "white" : "#666664"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3159_16598">
                        <rect
                          width="14"
                          height="14"
                          fill="white"
                          transform="translate(0 0.896484)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {q.likes_count}
                </span>
                <span
                  onClick={() => handleDislike(q.id)}
                  className={`transition-all border-1 py-2 min-w-[100px] w-full rounded-xl cursor-pointer flex justify-center items-center gap-2 font-medium text-sm ${q.user_disliked ? 'border-[#98C1A9] bg-[#98C1A9] text-white' : 'border-[#98C1A9] text-[#666664]'
                    }`}
                >
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
                    <g clipPath="url(#clip0_3159_23215)">
                      <path
                        d="M11.1641 9.04673L8.62406 13.1067C8.52562 13.2672 8.3873 13.3994 8.22257 13.4906C8.05784 13.5817 7.87231 13.6286 7.68406 13.6267C7.5358 13.6321 7.38797 13.6077 7.24931 13.5549C7.11065 13.5022 6.98398 13.4221 6.87677 13.3196C6.76956 13.217 6.68399 13.094 6.62513 12.9579C6.56627 12.8217 6.5353 12.6751 6.53406 12.5267V9.61673H2.14406C1.98185 9.61147 1.82258 9.57194 1.67674 9.50072C1.5309 9.42951 1.40178 9.32823 1.29788 9.20355C1.19398 9.07887 1.11765 8.93361 1.0739 8.77731C1.03015 8.62102 1.01999 8.45724 1.04406 8.29673L1.84406 3.13673C1.87819 2.86097 2.01185 2.60717 2.21994 2.42302C2.42802 2.23888 2.6962 2.13707 2.97406 2.13673H9.53406C9.84634 2.13551 10.1546 2.20743 10.4341 2.34673L11.1541 2.70673"
                        stroke={q.user_disliked ? "white" : "#666664"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.1641 9.04633V2.73633"
                        stroke={q.user_disliked ? "white" : "#666664"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5352 2.73633H11.1652V9.04633H13.5352C13.6678 9.04633 13.7949 8.99365 13.8887 8.89988C13.9825 8.80611 14.0352 8.67894 14.0352 8.54633V3.23633C14.0352 3.10372 13.9825 2.97654 13.8887 2.88277C13.7949 2.78901 13.6678 2.73633 13.5352 2.73633V2.73633Z"
                        stroke={q.user_disliked ? "white" : "#666664"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3159_23215">
                        <rect
                          width="14"
                          height="14"
                          fill="white"
                          transform="matrix(-1 0 0 1 14.5352 0.896484)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {q.dislikes_count}
                </span>
              </div>

              <span
                onClick={() => handleReply(q.id, q.message)}
                className="communityReply transition-all border-1 border-[#98C1A9] py-2 min-w-[120px] max-w-[120px] w-full rounded-xl cursor-pointer flex justify-center items-center gap-2 text-[#666664] font-medium text-sm"
              >
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
                  <g clipPath="url(#clip0_3159_15870)">
                    <path
                      d="M4.31641 7.89648C4.59255 7.89648 4.81641 7.67263 4.81641 7.39648C4.81641 7.12034 4.59255 6.89648 4.31641 6.89648C4.04026 6.89648 3.81641 7.12034 3.81641 7.39648C3.81641 7.67263 4.04026 7.89648 4.31641 7.89648Z"
                      stroke="#666664"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.56641 7.89648C7.84255 7.89648 8.06641 7.67263 8.06641 7.39648C8.06641 7.12034 7.84255 6.89648 7.56641 6.89648C7.29026 6.89648 7.06641 7.12034 7.06641 7.39648C7.06641 7.67263 7.29026 7.89648 7.56641 7.89648Z"
                      stroke="#666664"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8164 7.89648C11.0925 7.89648 11.3164 7.67263 11.3164 7.39648C11.3164 7.12034 11.0925 6.89648 10.8164 6.89648C10.5403 6.89648 10.3164 7.12034 10.3164 7.39648C10.3164 7.67263 10.5403 7.89648 10.8164 7.89648Z"
                      stroke="#666664"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.56641 13.3965L0.566406 14.3965L1.56641 11.3965V2.39648C1.56641 2.13127 1.67176 1.87691 1.8593 1.68938C2.04684 1.50184 2.30119 1.39648 2.56641 1.39648H12.5664C12.8316 1.39648 13.086 1.50184 13.2735 1.68938C13.461 1.87691 13.5664 2.13127 13.5664 2.39648V12.3965C13.5664 12.6617 13.461 12.9161 13.2735 13.1036C13.086 13.2911 12.8316 13.3965 12.5664 13.3965H4.56641Z"
                      stroke="#666664"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3159_15870">
                      <rect
                        width="14"
                        height="14"
                        fill="white"
                        transform="translate(0.0664062 0.896484)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Reply ({q.replies.length})
              </span>
            </div>

            {renderReplies(q.replies)}
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M10.1484 0.5L3.99844 6.65C3.95061 6.69489 3.91248 6.74911 3.88642 6.80931C3.86036 6.8695 3.84692 6.9344 3.84692 7C3.84692 7.0656 3.86036 7.1305 3.88642 7.19069C3.91248 7.25089 3.95061 7.30511 3.99844 7.35L10.1484 13.5"
                stroke="#666664"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`min-w-[45px] min-h-[45px] font-semibold text-sm border-1 border-[#98C1A9] rounded-lg transition cursor-pointer ${currentPage === i + 1 ? "bg-[#98C1A9] text-white" : ""
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 cursor-pointer"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path
                d="M0.851562 0.5L7.00156 6.65C7.04939 6.69489 7.08752 6.74911 7.11358 6.80931C7.13964 6.8695 7.15308 6.9344 7.15308 7C7.15308 7.0656 7.13964 7.1305 7.11358 7.19069C7.08752 7.25089 7.04939 7.30511 7.00156 7.35L0.851562 13.5"
                stroke="#666664"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Form */}
      <section className="">
        <p className="text-[#585C5A] text-3xl font-medium text-center mt-10 mb-8">
          {formHeading}
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form
          className="flex flex-col gap-7"
          id="questionForm"
          onSubmit={handleSubmit}
          ref={questionFormRef}
        >
          {parentId != null && (
            <div className="field flex flex-col gap-2 w-full">
              <label className="text-[#666664] text-md">Reply On</label>
              <div className="w-full relative flex items-center">
                <input
                  type="text"
                  readOnly
                  value={replyMessage}
                  className="rounded-lg py-3 px-3 outline-0 w-full pr-15 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]"
                />
                <span
                  className="absolute right-2 cursor-pointer"
                  onClick={() => {
                    setParentId(null);
                    setFormHeading("Ask a Question");
                  }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                    <path
                      d="M9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                      fill="#666664"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                      fill="#666664"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          )}

          <div className="row flex xl:flex-row lg:flex-row md:flex-row flex-col gap-10">
            <div className="field flex flex-col gap-2 w-full">
              <label htmlFor="full_name" className="text-[#666664] text-md">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="rounded-lg py-3 px-3 outline-0 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]"
                required
              />
            </div>

            <div className="field flex flex-col gap-2 w-full">
              <label htmlFor="email_address" className="text-[#666664] text-md">
                Email Address
              </label>
              <input
                type="email"
                id="email_address"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
                className="rounded-lg py-3 px-3 outline-0 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]"
                required
              />
            </div>
          </div>

          <div className="field flex flex-col gap-2">
            <label htmlFor="comments" className="text-[#666664] text-md">
              Comments
            </label>
            <textarea
              placeholder="Write your question or comment here"
              id="comments"
              name="comments"
              rows={4}
              required
              value={formData.comments}
              onChange={handleChange}
              className="resize-none rounded-lg py-2 px-3 outline-0 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={posting}
              className={`min-w-[266px] max-w-[266px] min-h-[60px] max-h-[60px] rounded-lg transition-all border-2 border-[#98C1A9] bg-[#98C1A9] text-white font-medium flex justify-center items-center gap-2 mx-auto
                ${posting
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:text-[#98C1A9] hover:bg-white"
                }
              `}
            >
              {posting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
        </form>
      </section>

      <LoginAlertModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
