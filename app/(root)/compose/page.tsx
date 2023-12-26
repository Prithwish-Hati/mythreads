import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const ComposePage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userData = await fetchUser(user.id);

  return (
    <main>
      <h1 className="text-2xl lg:text-4xl font-bold text-light-1 text-center">
        Write Your Thread
      </h1>
      <PostThread userId={userData?._id.toString()}/>
    </main>
  );
};

export default ComposePage;
