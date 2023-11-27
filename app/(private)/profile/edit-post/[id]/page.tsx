import "server-only";
import EditPost from "./EditPost";
import DeleteButton from "./DeleteButton";
import { getJWTPayload } from "@/app/helpers/auth";
import { sql } from "@/db";

async function fetchPost(id: number) {
  const jwtPayload = await getJWTPayload();

  const res = await sql("select * from posts where id = $1 and user_id = $2", [
    id,
    jwtPayload?.sub,
  ]);

  if (res.rowCount > 0) return res.rows[0];
}

export default async function EditPostPage({
  params,
}: {
  params: { id: number };
}) {
  const post = await fetchPost(params.id);

  if (!post) return <div>failed to load</div>;

  return (
    <div>
      <h2>Edit post</h2>
      <div className="flex flex-col gap-5">
        <EditPost prevPost={post} />
        <DeleteButton postId={post.id} />
      </div>
    </div>
  );
}
