import { Container } from 'semantic-ui-react';
import { BasicLayout } from '@/layouts';
import { Home } from '@/components/Home';
import { Separator, BarTrust, BannerAd, Seo } from '@/components/Shared';

const platformsId = {
  playstation: 1,
  xbox: 2,
  nintendo: 3,
  pc: 4,
};

export default function LandingUserPage() {
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
          <Home.LatestGames
            title="PlayStation"
            limit={3}
            platformId={platformsId.playstation}
          />
        </Container>

        <Separator height={100} />

        <BannerAd
          title="Register and get the best prices"
          subtitle="Compare with other games and choose yours!"
          btnTitle="Enter now"
          btnLink="/account"
          image="/images/img01.png"
        />

        <Separator height={50} />

        <Container>
          <Home.LatestGames
            title="Xbox"
            limit={3}
            platformId={platformsId.xbox}
          />
        </Container>

        <Separator height={100} />
      </BasicLayout>
    </>
  );
}
