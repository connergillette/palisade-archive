import { LoaderArgs, LoaderFunction, Response, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createServerClient } from '@supabase/auth-helpers-remix'

export const loader : LoaderFunction = async ({ request, params }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )

  const campaignId = (params && params['id']) || ''
  let campaign = {}

  const dataFetch = await supabase.from('campaigns').select().eq('id', campaignId)
  if (!dataFetch.error) {
    campaign = dataFetch.data[0]
  }

  return { campaign }
}

export default function CampaignDetail() {
  const { campaign } = useLoaderData()

  return (
    <div>
      <h1>{campaign.name}</h1>
    </div>
  )
}