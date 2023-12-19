"use client";

import { CommentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  currentUserImg: string;
  threadId: string;
  currentUserId: string;
}

const Comment = ({ currentUserImg, threadId, currentUserId }: Props) => {
 
 const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      values.thread,
      currentUserId,
      threadId
    )

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex justify-between gap-10 items-center mb-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="w-full flex gap-3 items-center">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  width={45}
                  height={45}
                  alt="Profile Photo"
                  className="object-contain rounded-full"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Write comment..."
                  className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="rounded-full text-black bg-white hover:text-white"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
