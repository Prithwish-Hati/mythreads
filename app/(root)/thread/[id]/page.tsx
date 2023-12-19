import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const thread = await fetchThreadById(params.id);

  const userData = await fetchUser(user.id);
  return (
    <main className="text-light-1">
      <section>
        <ThreadCard
          key={thread._id.toString()}
          id={thread._id.toString()}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          createdAt={thread.createdAt.toLocaleDateString()}
          comments={thread.children}
          isComment={false}
        />

        <Comment
          currentUserImg={userData?.image}
          threadId={thread._id.toString()}
          currentUserId={userData?._id.toString()}
        />
      </section>

      <section className="mt-10">
        {thread.children.map((child: any) => (
          <ThreadCard
          key={child._id.toString()}
          id={child._id.toString()}
          currentUserId={user?.id || ""}
          parentId={child.parentId}
          content={child.text}
          author={child.author}
          createdAt={child.createdAt.toLocaleDateString()}
          comments={child.children}
          isComment
          />
        ))}
      </section>
    </main>
  );
};

export default Page;
