import CampaignListItem from './CampaignListItem'

interface Props {
  campaigns: object[]
}

export default function CampaignList({ campaigns }: Props) {
  return (
    <div className="flex flex-col">
      {
        campaigns.map(campaign => (
          <CampaignListItem campaign={campaign} />
        ))
      }
    </div>
  )
}