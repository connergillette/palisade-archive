import { ActionFunction, LoaderArgs, LoaderFunction, json, redirect } from '@remix-run/node'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { useActionData, useLoaderData } from 'react-router'
import CampaignList from '~/components/CampaignList'

export const action: ActionFunction = async ({ request }) => {
  const response = new Response()

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )

  const { data: { session }} = await supabase.auth.getSession()

  // ...perform action

  return redirect('/')
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const response = new Response()
  // an empty response is required for the auth helpers
  // to set cookies to manage auth

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )
  const { data: { session }} = await supabase.auth.getSession()

  const { data: campaigns } = await supabase.from('campaigns').select().order('order').eq('type', 'campaign')
  const { data: oneShots } = await supabase.from('campaigns').select().order('order').eq('type', 'one-shot')

  /// ...resolve loader

  return json({ campaigns, oneShots, session })
}

export default function Index() {
  const { campaigns, oneShots, session } = useLoaderData()
  const actionData = useActionData()

  // if (session) {
    return (
      <div className="flex flex-col gap-10 py-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-zinc-700">Campaigns</h1>
          <CampaignList campaigns={campaigns} />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-zinc-700">One-Shots</h1>
          <CampaignList campaigns={oneShots} />
        </div>
      </div>
    );
  }

//   return <div className="italic text-5xl text-center my-24">Coming soon.</div>
// }
