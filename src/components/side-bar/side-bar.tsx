import { Component } from "react";
import styles from "./side-bar.module.scss";
import { SortOrder } from '../../App';

type SideBarProps = {
  sort: (sortOrder: SortOrder) => void;
};

class SideBar extends Component<SideBarProps> {

  render() {
    return (
      <div className={styles.sideBar}>
        <p className={styles.sortTitle}>Сортировка</p>
        <div className={styles.button} onClick={() => { this.props.sort(SortOrder.BYCITY) }}>
          по городу
        </div>
        <div className={styles.button} onClick={() => { this.props.sort(SortOrder.BYCOMPANY) }}>
          по компании
        </div>
      </div >
    );
  };
};

export default SideBar