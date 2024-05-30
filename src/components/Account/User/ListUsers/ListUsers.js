import { useState, useEffect } from "react";
import { map } from "lodash";
import { User as UserCtrl } from '@/api';
import { User } from "./User";
import styles from './ListUsers.module.scss';

const userCtrl = new UserCtrl();

const ListUsers = ({ reload, onReload }) => {
  console.log('listusers component rendered');
  const [users, setUsers] = useState(null);
  // const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userCtrl.getAllUsers();
        console.log(response);
        setUsers(response);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [reload]);

  if (!users) return <div>Loading...</div>; // Display a loading indicator

  console.log('users: ', users);

  console.log(users.map((user) => (user)));

  return (
    <div className={styles.addressesContainer}>
      <div className={styles.addressesGrid}>
        {users.map((user) => {
          console.log(user); // Log each user object
          return (
            <div key={user.id} className={styles.addressItem}>
              <div className={styles.address}>
                <User
                  userId={user.id}
                  user={user}
                  onReload={onReload}
                />
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default ListUsers;
