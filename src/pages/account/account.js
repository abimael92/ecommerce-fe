import { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { BasicLayout } from '@/layouts';
import { useAuth } from '@/hooks';
import {
  Info,
  Settings,
  Address,
  Wishlist,
  Game,
  User,
  Orders,
} from '@/components/Account';
import { Separator, Seo } from '@/components/Shared';
import 'semantic-ui-css/semantic.min.css';
import styles from './account.module.scss';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);

  if (!user) {
    router.push('/');
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: 'My Orders',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Orders />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Wishlist',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Wishlist />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Addresses',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 20, icon: 'settings', content: 'Settings' },
      render: () => (
        <Tab.Pane attached={false} key={99}>
          <Settings.ChangeNameForm />
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm />
            <Settings.ChangePasswordForm />
          </div>
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: 'log out',
        content: '',
        onClick: logout,
      },
    },
  ];

  // Conditionally add tabs for admin
  if (user.admin) {
    panes.splice(3, 0, {
      menuItem: 'Games',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          <Game.AddGame onReload={onReload} />
          <Game.ListGames reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    });
    panes.splice(3, 0, {
      menuItem: 'Users',
      render: () => (
        <Tab.Pane attached={false} style={{ fontSize: 'x-large' }}>
          {/* Render user-related components */}
          <User.AddUser onReload={onReload} />
          {/* Example: <UsersComponent /> */}
          <User.ListUsers reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    });
  }

  return (
    <>
      <Seo title="My Account" />

      <BasicLayout isContainer relative>
        <Info />

        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        ></Tab>
      </BasicLayout>
    </>
  );
}
