import { useEffect, useState } from 'react';
import { BasicLayout } from '@/layouts';
import { Seo } from '@/components/Shared';
import { Game } from '@/api';
import AddGameForm from '@/components/AddGame/AddGameForm'; // Import AddGameForm component

const gameCtrl = new Game();

export default function AddGamePage() {
  // const [game, setGame] = useState(null); // Initialize state to store game data

  const handleSubmit = async (formData) => {
    console.log('Form data:', formData);
    // try {
    //   const response = await gameCtrl.postGame(formData);
    //   setGame(response.data); // Assuming the response returns the newly added game data
    //   console.log('Game added successfully:', response.data);
    // } catch (error) {
    //   console.error('Error adding game:', error);
    // }
  };

  return (
    <>
      <Seo title="Add Game" />

      <BasicLayout isContainer relative>
        {/* Pass the handleSubmit function as a prop to the AddGameForm component */}
        <AddGameForm onSubmit={handleSubmit} />
      </BasicLayout>
    </>
  );
}
