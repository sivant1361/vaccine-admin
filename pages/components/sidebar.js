import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCog,
  faDashboard,
  faList,
  faPerson,
  faSignIn,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import firebase from "../../firebase/index";
import styles from "../../styles/Drawer.module.css";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  async function logout() {
    await firebase
      .auth()
      .signOut()
      .then(() =>
        router.push({
          pathname: "/auth",
        })
      );
  }

  return (
    <div className={styles.sideContainer}>
      <div className={styles.logo}>
        <h2>COVAC</h2>
      </div>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <FontAwesomeIcon
              icon={faList}
              style={{ width: "18px", cursor: "pointer", marginRight: "10px" }}
            />
            <a href="/add">Add Center</a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faDashboard}
              style={{ width: "18px", cursor: "pointer", marginRight: "10px" }}
            />
            <a href="/centers">Centers</a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCog}
              style={{ width: "18px", cursor: "pointer", marginRight: "10px" }}
            />
            <a href="/appointments">Slots</a>
          </li>

          <li>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ width: "18px", cursor: "pointer", marginRight: "10px" }}
            />
            <a href="#" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
