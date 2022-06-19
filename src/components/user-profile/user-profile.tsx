import { User } from "../user-box/user-box";
import styles from "./user-profile.module.scss";
import React from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";

type UserProfileProps = {
  user: User,
  uploadUser: (data: User) => void
};

type Inputs = {
  name: string,
  username: string,
  email: string,
  street: string,
  city: string,
  zipcode: string,
  website: string,
  comments: string
};

function UserProfile(props: UserProfileProps): React.ReactElement {

  const { register, reset, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      name: props.user.name,
      username: props.user.username,
      email: props.user.email,
      street: props.user.address.street,
      city: props.user.address.city,
      zipcode: props.user.address.zipcode,
      website: props.user.website
    }
  });

  const [isActive, setActive] = React.useState<boolean>(false);

  function prepareUser(data: Inputs): User {
    const userForUpload: User = {
      id: props.user.id,
      name: data.name,
      username: data.username,
      email: data.email,
      address: {
        suite: props.user.address.suite,
        street: data.street,
        city: data.city,
        zipcode: data.zipcode,
        geo: {
          lat: props.user.address.geo.lat,
          lng: props.user.address.geo.lng
        },
      },
      phone: props.user.phone,
      website: data.website,
      company: {
        name: props.user.company.name,
        catchPhrase: props.user.company.catchPhrase,
        bs: props.user.company.bs
      },
      comments: data.comments
    };
    setActive(!isActive);
    return userForUpload
  };

  function toggleActive(): void {
    if (isActive) {
      reset();
    };
    setActive(!isActive);
  };

  const errorInputs = Object.getOwnPropertyNames(errors);

  function currentInputClassName(name: string) {
    return classNames(
      styles.userInput,
      {
        [styles.userInputActive]: isActive,
        [styles.userInputNoActive]: !isActive
      },
      {
        [styles.userErrorInput]: errorInputs.includes(name)
      }
    );
  };

  const currentClassNames = {
    name: currentInputClassName("name"),
    username: currentInputClassName("username"),
    email: currentInputClassName("email"),
    street: currentInputClassName("street"),
    city: currentInputClassName("city"),
    zipcode: currentInputClassName("zipcode"),
    website: currentInputClassName("website"),
    comments: classNames({ [styles.userCommentActive]: isActive, [styles.userCommentNoActive]: !isActive }, styles.userCommentsInput),
    button: classNames({ [styles.activeButton]: isActive, [styles.noActiveButton]: !isActive }, styles.buttomButton)
  };

  return (
    <div >
      <div className={styles.profileHeader}>
        <div >
          <p className={styles.userProfileTitle}>Профиль пользователя </p >
        </div>
        <div className={classNames(styles.buttonActive, { [styles.displayDiv]: isActive })} onClick={toggleActive}>
          <p>Редактировать</p>
        </div>
        <div className={classNames(styles.buttonActive, { [styles.displayDiv]: !isActive })} onClick={toggleActive}>
          <p>Отменить</p>
        </div>
      </div>

      <form onSubmit={handleSubmit((data: Inputs) => props.uploadUser(prepareUser(data)))} >
        <div className={styles.userProfileContainer}>
          <p>Name: </p>
          <input
            type="text"
            {...register("name", { required: true })}
            className={currentClassNames.name}
            disabled={!isActive}
          />
          <p>user Name: </p>
          <input
            type="text"
            {...register("username", { required: true })}
            className={currentClassNames.username}
            disabled={!isActive}
          />
          <p>E-mail: </p>
          <input
            type="text"
            {...register("email", { required: true })}
            className={currentClassNames.email}
            disabled={!isActive}
          />
          <p>Street: </p>
          <input
            type="text"
            {...register("street", { required: true })}
            className={currentClassNames.street}
            disabled={!isActive}
          />
          <p>City: </p>
          <input
            type="text"
            {...register("city", { required: true })}
            className={currentClassNames.city}
            disabled={!isActive}
          />
          <p>Zip code: </p>
          <input
            type="text"
            {...register("zipcode", { required: true })}
            className={currentClassNames.zipcode}
            disabled={!isActive}
          />
          <p>Website: </p>
          <input
            type="text"
            {...register("website", { required: true })}
            className={currentClassNames.website}
            disabled={!isActive}
          />
          <p>Comments: </p>
          <textarea
            className={currentClassNames.comments}
            disabled={!isActive}
            {...register("comments")}
          />
        </div>
        <div className={styles.buttomButtonContainer}>
          <input type="submit" value="Отправить" className={currentClassNames.button} disabled={!isActive} />
        </div>
      </form>
    </div >
  );
};

export default UserProfile
