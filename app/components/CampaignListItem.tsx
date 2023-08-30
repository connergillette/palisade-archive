import { useState } from 'react'
import BadlandsGlyphs from '~/assets/badlands.png'
import OlarviaGlyphs from '~/assets/olarvia.png'

interface Props {
  campaign: object
}

export default function CampaignListItem({ campaign }: Props) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <a href={`campaigns/${campaign.id}`}>
      <div className="flex max-lg:flex-col gap-20 w-full mx-auto relative" key={`campaign-${campaign.id}`} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <h2 className="text-2xl w-full relative flex">
          <div>{campaign.name}</div>
        </h2>
        <div className={`object-contain transition-opacity duration-500 delay-100 ${isHovering === true ? 'opacity-100' : 'opacity-0'}`}>
          <img src={campaign.name === 'Olarvia' ? OlarviaGlyphs : BadlandsGlyphs } alt="Glyphs representing player characters" className="object-contain h-full" />
        </div>
        <div className="flex gap-10 h-full my-auto w-full justify-end whitespace-nowrap">
          <span className="text-yellow-200">{campaign.dm_name}</span>
          <span>{campaign.time_descriptor}</span>
          <span>{campaign.location_descriptor}</span>
        </div>
      </div>
    </a>
  )
}