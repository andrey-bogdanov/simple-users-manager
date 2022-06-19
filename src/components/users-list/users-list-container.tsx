import { Component } from "react";
import UsersList from "./users-list"
import axios from "axios";
import { User } from "../user-box/user-box"
import { SortOrder } from "../../App";

const usersListUrl: string | undefined = process.env.REACT_APP_USERS_LIST_URL;

console.log(usersListUrl);

export type UsersListContainerProps = {
  sortOrder: SortOrder
};

export type UsersListContainerState = {
  users: User[],
  isLoading: boolean
};

function sortUsers(sortOrder: string, users: User[]) {
  const sortedUsers = [...users];
  switch (sortOrder) {
    case "byCompany":
      sortedUsers.sort((a: User, b: User) => a.company.name.toLowerCase().localeCompare(b.company.name.toLowerCase()));
      break;
    case "byCity":
      sortedUsers.sort((a: User, b: User) => a.address.city.toLowerCase().localeCompare(b.address.city.toLowerCase()));
  };
  return sortedUsers
};

class UsersListContainer extends Component<UsersListContainerProps, UsersListContainerState> {

  constructor(props: UsersListContainerProps) {
    super(props)
    this.state = {
      users: [],
      isLoading: true
    }
  };

  componentDidMount() {
    if (usersListUrl !== undefined) {
      axios.get(usersListUrl).then((users) => {
        setTimeout(() => { // Just to show you a loading effect, sorry ;)
          this.setState({ users: users.data, isLoading: false })
        }, 1000);
      })
    };
  };

  render() {
    const sortedUsers = sortUsers(this.props.sortOrder, this.state.users);
    return <UsersList users={sortedUsers} isLoading={this.state.isLoading} />
  };
};

export default UsersListContainer