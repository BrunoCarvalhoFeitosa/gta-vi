"use client"
import { SecondaryCharacterLayout } from "@/app/components/layout/secondary-character-layout"

export const SecondaryCharacterCalHamptonSection = () => {
  return (
    <SecondaryCharacterLayout
      id="cal-hampton"
      isFirst
      firstTitle="Cal Hampton"
      firstSubtitle="E se tudo na internet fosse verdade?"
      firstDescription="Amigo do Jason e parceiro do Brian, o Cal se sente mais seguro quando está em casa, bisbilhotando as comunicações da Guarda Costeira com umas cervejas na mão e algumas abas anônimas abertas."
      secondTitle="Os psicopatas tão no comando. Vai se acostumando."
      secondDescription="O Cal está na maré baixa dos Estados Unidos e é feliz assim. A paranoia casual atrai paranoicos, mas o amigo dele, Jason, tem planos maiores."
      background="bg-blue-600"
      gradientBackground="from-blue-600/90 from-10% to-transparent"
      imageBackgroundCover="/images/cal-hampton/image-cal-hampton-background.webp"
      imageBackgroundCharacter="/images/cal-hampton/image-cal-hampton-01.webp"
      firstImage="/images/cal-hampton/image-cal-hampton-02.webp"
      firstImageAlt="Foto do Cal Hampton"
      secondImage="/images/cal-hampton/image-cal-hampton-03.webp"
      secondImageAlt="Foto do Cal Hampton"
      thirdImage="/images/cal-hampton/image-cal-hampton-04.webp"
      thirdImageAlt="Foto do Cal Hampton"
      fourthImage="/images/cal-hampton/image-cal-hampton-05.webp"
      fourthImageAlt="Foto do Cal Hampton"
      border="hover:border-white"
      video="/videos/video-cal-hampton.mp4"
      phrase="Tem pássaros demais voando em formação perfeita por aí."
    />
  )
}
