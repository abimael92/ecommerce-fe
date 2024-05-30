import { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { BasicModal, Confirm } from "@/components/Shared";
import { UserForm } from "../../UserForm";
import styles from "./User.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


export function User(props) {
  const { user, userId, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  console.log(user)
  const {
    username,
    email,
    password,
    confirmed,
    blocked,
    role,
    firstname,
    lastname,
    admin
  } = user;
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`${styles.userCard} ${flipped ? styles.flipped : ''}`}>
      <div className={styles.front}>
        <div className={styles.header}>
          <h2>{username}</h2>
          <h4>{firstname} {lastname}</h4>
        </div>
        <div className={styles.info}>
          <div className={styles.field}>
            <span className={styles.label} onClick={() => navigator.clipboard.writeText(username)}>Username:</span>
            <span className={styles.value}>{username}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label} onClick={() => navigator.clipboard.writeText(email)}>Email:</span>
            <span className={styles.value}>{email}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Confirmed:</span>
            {confirmed ? (
              <span className={styles.value}>&#10003; </span> // Unicode check mark
            ) : (
              <span className={styles.value}>&#10067; </span> // Unicode question mark
            )}
          </div>


          <div className={`${styles.field} ${styles.switchWrapper}`}>
            <span className={styles.label}>Blocked:</span>
            <label className={styles.switch}>
              <input type="checkbox" checked={blocked} readOnly />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>
      </div>
      <div className={styles.back}>
        <div className={styles.info}>
          <div className={styles.field}>
            <span className={styles.label}>Orders:</span>
            <div className={styles.orders}>
              <div className={styles.order}>Order 1 - $100</div>
              <div className={styles.order}>Order 2 - $150</div>
              <div className={styles.order}>Order 3 - $200</div>
            </div>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Address:</span>
            <span className={`${styles.value} ${styles.address}`}>123 Main St, City, Country</span>
          </div>
        </div>
      </div>
      <button className={`${styles.flipButton} ${styles.frontFlip}`} onClick={flipCard}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <button className={`${styles.flipButton} ${styles.backFlip}`} onClick={flipCard}>
        <i className="fas fa-arrow-right"></i>
      </button>
      {admin && <div className={styles.adminBar}>Admin</div>}
    </div>
  );



}
