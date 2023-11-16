import { Platform, Game } from '@/api'

export { default } from './platform'

export async function getServerSideProps(context) {
  const {
    params: { platform },
    query: { page = 1 },
  } = context

  const platformCtrl = new Platform()

  try {
    const responsePlatform = await platformCtrl.getBySlug(platform)
    console.log(`\n\nPlatform data:${responsePlatform}\n`)
  } catch (error) {
    console.log(`\n\ Error while fetching platform data: ${error}\n`)
    // Handle the error or log it appropriately
  }

  // const responsePlatform = await platformCtrl.getBySlug(platform);

  const gameCtrl = new Game()
  const responseGames = await gameCtrl.getGamesByPlatformSlug(platform, page)

  return {
    props: {
      platform: responsePlatform,
      games: responseGames.data,
      pagination: responseGames.meta.pagination,
    },
  }
}
