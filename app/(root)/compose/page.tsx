import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ComposePage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <main>
      <h1 className="text-4xl font-bold text-light-1 text-center">
        Write Your Thread
      </h1>
      <PostThread userId={userInfo._id.toString()}/>
    </main>
  );
};

export default ComposePage;
