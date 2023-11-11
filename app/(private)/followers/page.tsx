import UsersContainer from "@/app/components/UsersContainer";

export default async function Followers() {
  return (
    <main>
      <h2>Followers</h2>
      <UsersContainer endpoint="followers" />
    </main>
  );
}
