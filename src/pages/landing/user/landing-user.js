import { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { BasicLayout } from '@/layouts';
import { Home } from '@/components/Home';
import { Separator, BarTrust, BannerAd, Seo } from '@/components/Shared';
import styles from './landing-user.module.scss'

const platformsId = {
  playstation: 1,
  xbox: 2,
  nintendo: 3,
  pc: 4,
};

export default function LandingUserPage() {
  const [firstContainerPlatform, setFirstContainerPlatform] = useState(platformsId.playstation);
  const [secondContainerPlatform, setSecondContainerPlatform] = useState(platformsId.nintendo);

  return (
    <>
      <Seo />

      <BasicLayout>
        <Home.BannerLastGamePublished />

        <Separator height={100} />

        <Container>
          <Home.LatestGames title="Latest releases " />
        </Container>

        <Separator height={100} />

        <BarTrust />

        <Separator height={100} />

        <Container>
          <div className={styles.tabs}>
            <button
              onClick={() => setFirstContainerPlatform(platformsId.playstation)}
              className={firstContainerPlatform === platformsId.playstation ? styles.active : ""}
            >
              PlayStation
            </button>
            <button
              onClick={() => setFirstContainerPlatform(platformsId.xbox)}
              className={firstContainerPlatform === platformsId.xbox ? styles.active : ""}
            >
              Xbox
            </button>
          </div>
          <Home.LatestGames
            title={firstContainerPlatform === platformsId.playstation ? "PlayStation" : "Xbox"}
            limit={3}
            platformId={firstContainerPlatform}
          />
        </Container>


        <Separator height={100} />

        <BannerAd
          title="Register and get the best prices"
          subtitle="Compare with other games and choose yours!"
          btnTitle="Enter now"
          btnLink="/account"
          image="/images/gaming-rivals.png"
        />

        <Separator height={50} />

        <Container>
          <div className={styles.tabs}>
            <button
              onClick={() => setSecondContainerPlatform(platformsId.nintendo)}
              className={secondContainerPlatform === platformsId.nintendo ? styles.active : ""}
            >
              Nintendo
            </button>
            <button
              onClick={() => setSecondContainerPlatform(platformsId.pc)}
              className={secondContainerPlatform === platformsId.pc ? styles.active : ""}
            >
              PC
            </button>
          </div>
          <Home.LatestGames
            title={secondContainerPlatform === platformsId.nintendo ? "Nintendo" : "PC"}
            limit={3}
            platformId={secondContainerPlatform}
          />
        </Container>

        <Separator height={100} />
      </BasicLayout>
    </>
  );
}
