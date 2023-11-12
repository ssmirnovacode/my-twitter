import UserPageHeader from "./UserPageHeader";

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div>
      <header>
        <UserPageHeader username={params.username} />
      </header>
    </div>
  );
}
