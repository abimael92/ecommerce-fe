import { Platform, Game } from '@/api'

export { default } from './platform'

export async function getServerSideProps(context) {
  const { query, params } = context

  const { page = 1 } = query
  const { platform } = params
  // const {
  //   params: { platform },
  //   query: { page = 1 },
  // } = context

  console.log(`\ngetServerSideProps Platform :${platform}\n`)

  const platformCtrl = new Platform()
  let responsePlatform = null

  try {
    console.log(`\ before platform response in getbyslug\n\n`)
    responsePlatform = await platformCtrl.getBySlug(platform)
    console.log(`\n\nPlatform data:${responsePlatform}\n`)
  } catch (error) {
    console.log(`\n\ Error while fetching platform data: ${error}\n`)
  }

  // const responsePlatform = await platformCtrl.getBySlug(platform);⁄

  const gameCtrl = new Game()
  // const responseGames = await gameCtrl.getGamesByPlatformSlug(platform, page)

  return {
    props: {
      platform: responsePlatform,
      // games: responseGames.data,
      // pagination: responseGames.meta.pagination,
      games: null,
      pagination: null,
    },
  }
}
