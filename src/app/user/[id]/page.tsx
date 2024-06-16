// import type { userInfo } from "~/server/db/schema";
import { api } from "~/trpc/server";

export default async function UserInfoPage({params}: {params: {id: string}}) {
  const user = (await api.user.getOne({id: params.id}))[0];
    
    return <div>
        <table>
            <tr>
                <th>Id</th>
                <td>{user?.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{user?.firstName} {user?.middleName} {user?.lastName}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{user?.email}</td>
            </tr>
            <tr>
                <th>Date Of Birth</th>
                <td>{user?.dateOfBirth}</td>
            </tr>
        </table>
    </div>
}