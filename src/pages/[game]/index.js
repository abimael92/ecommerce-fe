import { Game } from '@/api'

export { default } from './game'

export async function getServerSideProps(context) {
  try {
    const {
      params: { game },
    } = context

    const gameCtrl = new Game()
    const response = await gameCtrl.getBySlug(game)

    return {
      props: {
        game: response,
      },
    }
  } catch (error) {
    console.error('\n\n Error in getServerSideProps: \n\n ', error)

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
