"use client"
import { SecondaryCharacterLayout } from "@/app/components/layout/secondary-character-layout"

export const SecondaryCharacterRaulBautistaSection = () => {
  return (
    <SecondaryCharacterLayout
      id="raul-bautista"
      isInverted={true}
      firstTitle="Raul Bautista"
      firstSubtitle="Experiência faz diferença."
      firstDescription="Confiança, charme e cérebro – Raul é um ladrão de bancos veterano que está sempre em busca de talentos prontos para assumir os riscos que trazem as maiores recompensas."
      secondTitle="Quem é profissional se adapta."
      secondDescription="A imprudência do Raul aumenta os riscos a cada êxito. Mais cedo ou mais tarde, a equipe dele vai precisar dobrar as apostas ou tirar as fichas da mesa."
      background="bg-[#723A5F]"
      gradientBackground="from-transparent to-[#723A5F]/90 to-70%"
      imageBackgroundCover="/images/raul-bautista/image-raul-bautista-background.webp"
      imageBackgroundCharacter="/images/raul-bautista/image-raul-bautista-01.webp"
      firstImage="/images/raul-bautista/image-raul-bautista-02.webp"
      firstImageAlt="Foto do Raul Bautista"
      secondImage="/images/raul-bautista/image-raul-bautista-03.webp"
      secondImageAlt="Foto do Raul Bautista"
      thirdImage="/images/raul-bautista/image-raul-bautista-04.webp"
      thirdImageAlt="Foto do Raul Bautista"
      fourthImage="/images/raul-bautista/image-raul-bautista-05.webp"
      fourthImageAlt="Foto do Raul Bautista"
      border="hover:border-white"
      video="/videos/video-raul-bautista.mp4"
      phrase="A vida é cheia de surpresas, camarada. Seria sábio da nossa parte lembrar disso."
    />
  )
}
