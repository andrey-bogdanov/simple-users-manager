import { Component } from "react";
import UserBox, { User } from "../user-box/user-box"
import classNames from "classnames";
import styles from "./users-list.module.scss"
import spinerStyles from "./spiner.module.scss"

export type UsersListType = {
  users: User[],
  isLoading: boolean,
};

class UsersList extends Component<UsersListType> {
  render() {
    return (
      <div>
        <p className={styles.usersListTitle}>Список пользователей</p >
        <div className={classNames({ [styles.disableDiv]: !this.props.isLoading, [styles.spinerContainer]: this.props.isLoading })}>
          <div className={spinerStyles.loader}>
            <div className={classNames(spinerStyles.inner, spinerStyles.one)}></div>
            <div className={classNames(spinerStyles.inner, spinerStyles.two)}></div>
            <div className={classNames(spinerStyles.inner, spinerStyles.three)}></div>
          </div>
        </div>
        <div className={styles.usersListBox}>
          {this.props.users.map((user) => (
            <UserBox name={user.name} company={user.company.name} city={user.address.city} key={user.id} id={user.id} />
          ))}

        </div>
        <p className={classNames(styles.numberUsers, { [styles.disableDiv]: this.props.users.length === 0 })}> Найдено {this.props.users.length} пользователей</p>
      </div >
    );
  };
};

export default UsersList