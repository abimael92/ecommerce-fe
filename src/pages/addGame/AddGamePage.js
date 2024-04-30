import { useEffect, useState } from 'react';
import { BasicLayout } from '@/layouts';
import { Seo } from '@/components/Shared';
import { Game } from '@/api';
import AddGameForm from '@/components/AddGame/AddGameForm'; // Import AddGameForm component

export default function AddGamePage() {

  return (
    <>
      <Seo title="Add Game" />

      <BasicLayout isContainer relative>
        <AddGameForm />
      </BasicLayout>
    </>
  );
}
