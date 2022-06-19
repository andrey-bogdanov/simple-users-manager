import UserProfile from "./user-profile";
import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { User } from "../user-box/user-box";

const usersListUrl: string | undefined = process.env.REACT_APP_USERS_LIST_URL;

type ParamsType = {
  userId?: string
};

function uploadUser(data: User): void {
  console.log(JSON.stringify(data));
};

function UserProfileContainer(): React.ReactElement {

  const params: ParamsType = useParams<ParamsType>();
  const userId: string | undefined = params.userId;

  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    if (usersListUrl !== undefined) {
      axios.get<User[]>(usersListUrl).then((response) => {
        setUsers(response.data);
      })
    }
  }, []);

  if (users.length === 0) return <></>;

  const user: User | undefined = users.find((user: User) => user.id === Number(userId));

  if (user === undefined) return <></>;

  return (
    <div>
      <UserProfile user={user} uploadUser={uploadUser} />
    </div>
  )
};

export default UserProfileContainer