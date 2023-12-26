import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userData = await fetchUser(user.id);
  
  
  const result = await fetchThreads(1, 30);
  return (
    <main className="flex justify-center px-3 lg:px-28">
      <section>
        {result.threads.length === 0 ? (
          <p className="text-white">No threads found</p>
        ) : (
          <>
            {result.threads.map((thread: any) => (
              <ThreadCard
              key= {thread._id.toString()}
              id= {thread._id.toString()}
              userId= {userData?._id.toString()}
              parentId= {thread.parentId}
              content= {thread.text}
              author= {thread.author}
              createdAt= {thread.createdAt.toLocaleDateString()}
              comments= {thread.children}
              isComment= {thread.children.length > 0}
              isLiked= {thread.likes.length > 0}
              likes= {thread?.likes}
              />
            ))}
          </>
        )}
      </section>
    </main>
  );
}
