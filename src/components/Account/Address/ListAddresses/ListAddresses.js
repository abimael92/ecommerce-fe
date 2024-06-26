import { useState, useEffect } from "react";
import { map } from "lodash";
import { Address as AddressCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { Address } from "./Address";
import styles from "./ListAddresses.module.scss";

const addressCtrl = new AddressCtrl();

export function ListAddresses(props) {
  const { reload, onReload } = props;
  const [addresses, setAddresses] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!addresses) return null;

  return (
    <div className={styles.addressesContainer}>

      <div className={styles.addressesGrid}>
        {map(addresses, (address) => (
          <div key={address.id} className={styles.addressItem}>
            <div className={styles.address}>
              <Address
                addressId={address.id}
                address={address.attributes}
                onReload={onReload}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
