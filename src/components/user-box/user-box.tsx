import { Component } from "react";
import styles from "./user-box.module.scss";

export type User = {
  "id": number,
  "name": string,
  "username": string,
  "email": string,
  "address": {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
      "lat": number,
      "lng": number
    }
  },
  "phone": string,
  "website": string,
  "company": {
    "name": string,
    "catchPhrase": string,
    "bs": string
  },
  "comments"?: string
};

type UserBoxProps = {
  company: string,
  name: string,
  city: string,
  key: number,
  id: number
};

class UsersBox extends Component<UserBoxProps> {
  render() {
    const profilePath = "/profile/" + String(this.props.id)
    return (
      <div className={styles.userBoxContainer}>
        <div className={styles.itemBox}>
          <div>
            <span className={styles.itemName}>ФИО: </span>
            <span>{this.props.name}</span>
          </div>
        </div>
        <div className={styles.itemBox}>
          <div>
            <span className={styles.itemName}>город:</span>
            <span>{this.props.city}</span>
          </div>
        </div>
        <div className={styles.itemBox}>
          <div>
            <span className={styles.itemName}>компания:</span>
            <span>{this.props.company} </span>
          </div>
          <div>
            <a href={profilePath} className={styles.toProfile}>Подробнее</a>
          </div>
        </div>
      </div>
    );
  };
};

export default UsersBox