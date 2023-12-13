"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  path: string;
}

export const createThread = async ({ text, author, path }: Params) => {
  try {
    connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
};

export const fetchThreads = async (pageNumber = 1, pageSize = 20) => {
  connectToDB();

  // Calculate the number of threads to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  //Fetch parent threads
  const threadsQuery = Thread.find({
    parendId: { $in: [null, undefined] },
  })
    .sort({ createdAt: "desc" }) //sorts threads
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

    //Counts the total number of parent threads
    const totalThreadsCount = await Thread.countDocuments({ parentId: { $in: [ null, undefined ]}})

    // Waits till the execution of threadsQuery
    const threads = await threadsQuery.exec()

    // Checks if next Page exists
    const isNext = totalThreadsCount > skipAmount + threads.length

    return { threads, isNext }
};
