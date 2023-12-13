import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id.toString(),
    username: userInfo ? userInfo.username : user.username,
    name: userInfo ? userInfo.name : user.firstName ?? "",
    bio: userInfo ? userInfo.bio : "",
    image: userInfo ? userInfo.image : user.imageUrl,
  };

  return (
    <main className="p-16">
      <h1 className="text-4xl font-bold text-light-1 text-center">
        Onboarding
      </h1>
      <p className="text-light-1 text-center">
        Finish your profile to use threads
      </p>
      <section className="px-56">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default OnboardingPage;
