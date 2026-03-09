"use client";
import classes from "./commentList.module.css";
import Comment from "@/components/Comment/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { getComments } from "@/app/lib/data/comments";

interface Comments {
  _id: string;
  date: Date;
  headline: string;
  author: string;
  content: string;
  image?: string;
}

interface CommentsProps {
  sortOrder: "asc" | "desc";
  initialComments: Comments[];
}
export default function CommentList({ initialComments, sortOrder }: CommentsProps) {
  const [items, setItems] = useState(initialComments);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItems(initialComments);
    setPage(1);
    setHasMore(true);
  }, [sortOrder, initialComments]);

  const fetchMoreComments = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const nextPage = page + 1;
    const newComments = await getComments(nextPage, sortOrder);

    if (!newComments || newComments.length === 0) {
      setHasMore(false);
      setIsLoading(false);
      return;
    }
    setItems((prev) => [...prev, ...newComments]);
    setPage(nextPage);
    setIsLoading(false);
  };

  return (
    <div>
      <InfiniteScroll
        next={fetchMoreComments}
        hasMore={hasMore}
        loader={<h3 className={classes.loading}>Lädt...</h3>}
        dataLength={items.length}
        endMessage={<p className={classes.noCommentsLeft}>-- Ende erreicht --</p>}
      >
        {items.map((comment) => (
          <Comment
            key={comment._id}
            comment={{ date: comment.date, headline: comment.headline, author: comment.author, content: comment.content, imageSrc: comment.image }}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
