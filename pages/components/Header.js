import React from 'react'
import styles from "../../styles/Header.module.css";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from '../../firebase/index';
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
const [user, loading, error] = useAuthState(firebase.auth());
if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (user) {
  return (
    <div className={styles.headContainer}>
        <div className={styles.headwrapper}>
            <div className={styles.title}>
                <h2>
                    Welcome, <span>{user.displayName}</span>
                </h2>
            </div>
        </div>
        <div className={styles.profile}>
             <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"40px"}}/>
        </div>
    </div>
  )}
  return(
    <div></div>
  ) 
  
}

export default Header;