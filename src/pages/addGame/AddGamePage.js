import { useEffect, useState } from 'react';
import { BasicLayout } from '@/layouts';
import { Seo } from '@/components/Shared';
import { Game } from '@/api';
import AddGameForm from '@/components/AddGame/AddGameForm'; // Import AddGameForm component

const gameCtrl = new Game();

export default function AddGamePage() {
  const handleSubmit = async (formData) => {
    console.log('Form data:', formData);
  };

  return (
    <>
      <Seo title="Add Game" />

      <BasicLayout isContainer relative>
        <AddGameForm />
      </BasicLayout>
    </>
  );
}
