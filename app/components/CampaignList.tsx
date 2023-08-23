import CampaignListItem from './CampaignListItem'

interface Props {
  campaigns: object[]
}

export default function CampaignList({ campaigns }: Props) {
  return (
    <>
      {
        campaigns.map(campaign => (
          <CampaignListItem campaign={campaign} />
        ))
      }
    </>
  )
}