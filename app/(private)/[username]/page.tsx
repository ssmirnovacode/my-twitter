import PostContainer from "@/app/components/PostContainer";
import UserPageHeader from "./UserPageHeader";

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div>
      <header>
        <UserPageHeader username={params.username} />
        <PostContainer username={params.username} />
      </header>
    </div>
  );
}
