import classes from "./page.module.css";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import PageHeader from "@/components/PageHeader/PageHeader";
import LoadingText from "@/components/LoadingText/LoadingText";

import CommentList from "@/components/Comment/CommentList/CommentList";
import { getComments } from "@/app/lib/data/comments";
import { Suspense } from "react";

interface CommentsProps {
  sortOrder: "asc" | "desc";
}
async function Comments({ sortOrder }: CommentsProps) {
  const comments = await getComments(1, sortOrder);

  return (
    <div>
      <CommentList key={sortOrder} initialComments={comments} sortOrder={sortOrder} />
    </div>
  );
}

export default async function Guestbook({ searchParams }: { searchParams: { sort?: string } }) {
  const { sort = "asc" } = await searchParams;
  const isAsc = sort === "asc";
  const newSort = isAsc ? "desc" : "asc";

  return (
    <>
      <PageHeader>Gästebuch</PageHeader>
      <div className={classes.guestbook}>
        <div className={classes.controls}>
          <ButtonLink isLink href={`?sort=${newSort}`}>
            {sort === "asc" ? "Neueste zuerst" : "Älteste zuerst"}
          </ButtonLink>
          <ButtonLink isLink href="guestbook/new-comment">
            Kommentar hinzufügen
          </ButtonLink>
        </div>
        <Suspense fallback={<LoadingText text="Lade Kommentare..." />}>
          <Comments sortOrder={isAsc ? "asc" : "desc"} />
        </Suspense>
      </div>
    </>
  );
}
