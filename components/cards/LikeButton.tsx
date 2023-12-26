"use client";

import { addLikeToThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  userId: any;
  threadId: any;
}

const LikeButton = ({ userId, threadId}: Props) => {
  
  const router =  useRouter()
  
  const handleLike = async () => {
    await addLikeToThread(userId, threadId);

    router.refresh();
  };
  return (
    <button type="button" onClick={handleLike}>
      <Image
        src="/like.svg"
        alt="like icon"
        width={20}
        height={20}
        className="cursor-pointer object-contain lg:w-[25px]"
      />
    </button>
  );
};

export default LikeButton;
