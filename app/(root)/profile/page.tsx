import { Button } from "@/components/ui/button";
import { fetchUserThreads } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

const ProfilePage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userData = await fetchUserThreads(user?.id);

  return (
    <main className="text-light-1 px-3 lg:px-36">
      <h1 className="text-4xl font-bold text-center hidden lg:block">Profile</h1>

      <section className="lg:mt-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl lg:text-3xl font-bold">{userData.name}</h2>
            <h3 className="2xl:text-lg">@{userData.username}</h3>
          </div>
          <Image
            src={userData.image}
            alt="Profile Photo"
            width={60}
            height={60}
            className="rounded-full object-contain lg:w-[80px]"
          />
        </div>
        <p className="mt-5 2xl:text-lg">{userData.bio}</p>

        {/* <Button
          type="button"
          className="w-full border-2 bg-transparent mt-7 rounded-lg border-dark-4 text-semibold"
        >
          Edit Profile
        </Button> */}
      </section>

      <section>
        <div className="flex my-10 gap-3 pb-2 border-b-2 border-light-2 items-center">
          <h3 className=" font-semibold ">Threads</h3>
          <p className="rounded-full bg-light-4 px-2 py-1 text-xs">
            {userData.threads.length}
          </p>
        </div>

        {userData.threads.map((thread: any) => (
          <article key={thread._id} className="mt-7 pb-4 border-b-2 border-dark-4">
            <div className="flex gap-3 items-start">
              <Image
                src={userData?.image}
                alt="profile-photo"
                width={40}
                height={40}
                className="object-contain rounded-full lg:w-[55px]"
              />
              <div>
                <h2 className="font-semibold">{userData.username}</h2>
                <p className="mt-1 text-light-2">{thread.text}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ProfilePage;
