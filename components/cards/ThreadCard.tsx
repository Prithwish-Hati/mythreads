import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

interface Props {
  id: string;
  userId: any;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[]; // comments array
  isComment?: boolean;
  isLiked?: boolean;
  likes?: any;
}

const ThreadCard = async ({
  id,
  userId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
  isLiked,
  likes,
}: Props) => {
  const thread = await fetchThreadById(id);

  const user = await currentUser();
  if (!user) return null;
  const userData = await fetchUser(user.id);
  if (!userData?.onboarded) redirect("/onboarding");

  return (
    <article
      className={`text-light-1 flex gap-3 mb-3 lg:mb-10 border-b-2 border-dark-4`}
    >
      <div className="w-auto">
        <Image
          src={author?.image}
          alt="profile-photo"
          width={45}
          height={45}
          className="object-contain rounded-full"
        />
      </div>
      <div className="mb-3 w-full">
        <h3 className="font-semibold text-sm lg:text-base 2xl:text-lg">
          {author?.name}
        </h3>
        <p className="mt-1 text-xs lg:text-sm 2xl:text-base">{content}</p>

        <div className="mt-1 lg:mt-3 flex gap-1 lg:gap-5 justify-start items-center">
          <LikeButton userId={userId} threadId={thread._id.toString()} />

          <Link href={`/thread/${id}`}>
            <Image
              src="/comment.svg"
              alt="comment icon"
              width={15}
              height={15}
              className="cursor-pointer lg:w-[20px] object-contain"
            />
          </Link>
        </div>
        <div className="flex mt-1 text-xs lg:text-sm text-slate-400">
          {isComment && comments.length > 0 && (
            <div className="flex justify-start items-center">
              <Link
                href={`thread/${id}`}
                className="text-slate-400 hover:underline"
              >
                {comments.length} Replies
              </Link>

              <p className="mx-1">&#x2022;</p>
            </div>
          )}

          {isLiked && likes.length > 0 && <p> {likes.length} Likes</p>}
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
