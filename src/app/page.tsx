// import { CreatePost } from "~/app/_components/create-post";
import type { userInfo } from "~/server/db/schema";
import { api } from "~/trpc/server";
import { SignUp } from "./components/sign-up";

export default async function Home() {
  const users: userInfo[] = await api.user.get();

  return (
    <main>
      <table className="border">
        <tr className="border">
          <th className="border"> uuid </th>
          <th className="border"> First Name </th>
          <th className="border"> Middle Name </th>
          <th className="border"> Last Name </th>
          <th className="border"> email </th>
          <th className="border"> Bate Of Birth </th>
        </tr>
        {
          users.map((user) => (
            <tr key={user.id} className="border">
              <td className="border">
                <a href={`/user/${user.id}`}>{user.id}</a>
              </td>
              <td className="border">{user.firstName}</td>
              <td className="border">{user.middleName}</td>
              <td className="border">{user.lastName}</td>
              <td className="border">{user.email}</td>
              <td className="border">{user.dateOfBirth}</td>
            </tr>
          ))
        }
      </table>
      <SignUp></SignUp>
    </main>
  );
}

