import Image from "next/image";

interface Props {
  id: string;
  currentUserId: string;
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
  isComment: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
}: Props) => {
  return (
    <article className="text-light-1 flex gap-3 mb-10 border-b-2 border-dark-4">
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
        <h3 className="font-semibold">{author?.name}</h3>
        <p className="mt-1 text-sm">{content}</p>

        <div className="mt-3 flex gap-3 justify-start">
          <Image
            src="/like.svg"
            alt="like icon"
            width={25}
            height={25}
            className="cursor-pointer"
          />
          <Image
            src="/comment.svg"
            alt="comment icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
