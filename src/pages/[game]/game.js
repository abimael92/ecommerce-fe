import { BasicLayout } from '@/layouts';
import { Game } from '@/components/Game';
import { Separator, Seo } from '@/components/Shared';

export default function GamePage(props) {
  const { game } = props;
  console.log(game);

  // Check if game is undefined
  if (!game) {
    // Render a loading indicator or return null
    return (
      <BasicLayout>
        <p>Game data not available</p>
      </BasicLayout>
    );
  }

  const { attributes } = game;
  const wallpaper = attributes?.wallpaper;

  console.log(wallpaper);

  return (
    <>
      <Seo title={attributes?.title} description={attributes?.summary} />

      <BasicLayout>
        <Game.HeaderWallpaper image={wallpaper?.data?.attributes?.url} />
        <Game.Panel gameId={game.id} game={attributes} />

        <Separator height={50} />

        <Game.Info game={attributes} />

        <Separator height={30} />

        <Game.Media
          video={attributes?.video}
          screenshots={attributes?.screenshots?.data}
        />

        <Separator height={50} />
      </BasicLayout>
    </>
  );
}
