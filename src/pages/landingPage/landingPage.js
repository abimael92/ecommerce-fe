import { Container, Header, Button } from 'semantic-ui-react'
import Link from 'next/link'
import { JoinLayout } from '@/layouts'
import { Seo } from '@/components/Shared'
import styles from './landingPage.module.scss'

const LandingPage = () => {
  return (
    <>
      <Seo title="Login" />

      <JoinLayout>
        <div className={styles.signIn}>
          <h1>Welcome to the Ultimate Gaming Experience!</h1>
          <p>
            Explore our collection of the latest and greatest video games. Find
            the games that match your passion and immerse yourself in the gaming
            world. <br />
            <br />
            Whether you're into action, adventure, strategy, or simulation,
            we've got something for every gamer.
          </p>

          <div className={styles.actions}>
            <Button primary size="huge">
              <Link href="join/sign-in" legacyBehavior>
                <a>Login</a>
              </Link>
            </Button>
          </div>
        </div>
      </JoinLayout>
    </>
  )
  // return (
  //   <>
  //     <Seo title="Login" />

  //     <JoinLayout>
  //       <div className={styles.signIn}>
  //         <Container text style={{ marginTop: '2em' }}>
  //           <Header as="h1" className={styles.signIn}>
  //             Welcome to the Ultimate Gaming Experience!
  //           </Header>
  //           <p>
  //             Explore our collection of the latest and greatest video games.
  //             Find the games that match your passion and immerse yourself in the
  //             gaming world.
  //           </p>
  //           <p>
  //             Whether you're into action, adventure, strategy, or simulation,
  //             we've got something for every gamer.
  //           </p>
  //           <div className={styles.actions}>
  //             <Button secondary size="huge">
  //               <Link href="/register" passHref>
  //                 <a>Create an Account</a>
  //               </Link>
  //             </Button>
  //             <div style={{ marginTop: '2em' }}>
  //               {/* Add any additional content or cool presentation elements here */}
  //             </div>
  //           </div>
  //         </Container>
  //       </div>
  //     </JoinLayout>
  //   </>
  // )
}

export default LandingPage
