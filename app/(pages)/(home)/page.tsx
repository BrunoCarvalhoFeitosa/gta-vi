import { HeroSection } from "./_components/hero-section"
import { PrimaryCharacterJasonDuval } from "./_components/primary-character-jason-duval-section"
import { PrimaryCharacterLuciaCaminos } from "./_components/primary-character-lucia-caminos-section"
import { SecondaryCharacterCalHamptonSection } from "./_components/secondary-character-cal-hampton-section"
import { ExploreViceCitySection } from "./_components/explore-vice-city-section"
import { SecondaryCharacterBoobieIkeSection } from "./_components/secondary-character-boobie-ike-section"
import { ExploreLeonidaKeysSection } from "./_components/explore-leonida-keys-section"
import { SecondaryCharacterDrequanPriestSection } from "./_components/secondary-character-drequan-priest-section"
import { ExploreGrassRiversSection } from "./_components/explore-grass-rivers"
import { SecondaryCharacterRealDimezSection } from "./_components/secondary-character-real-dimez-section"
import { ExplorePortGellhornSection } from "./_components/explore-port-gellhorn"
import { SecondaryCharacterRaulBautistaSection } from "./_components/secondary-character-raul-bautista"
import { ExploreAmbrosiaSection } from "./_components/explore-ambrosia"
import { SecondaryCharacterBrianHederSection } from "./_components/secondary-character-brian-heder-section"
import { ExploreMountKalagaSection } from "./_components/explore-mount-kalaga"
import { EndSection } from "./_components/end-section"

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <PrimaryCharacterJasonDuval />
      <PrimaryCharacterLuciaCaminos />
      <SecondaryCharacterCalHamptonSection />
      <ExploreViceCitySection />
      <SecondaryCharacterBoobieIkeSection />
      <ExploreLeonidaKeysSection />
      <SecondaryCharacterDrequanPriestSection />
      <ExploreGrassRiversSection />
      <SecondaryCharacterRealDimezSection />
      <ExplorePortGellhornSection />
      <SecondaryCharacterRaulBautistaSection />
      <ExploreAmbrosiaSection />
      <SecondaryCharacterBrianHederSection />
      <ExploreMountKalagaSection />
      <EndSection />
    </main>
  )
}

export default HomePage
