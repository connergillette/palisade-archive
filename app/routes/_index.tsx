import { ActionFunction, LoaderArgs, LoaderFunction, json, redirect } from '@remix-run/node'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { useActionData, useLoaderData } from 'react-router'

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

  const { data: campaigns } = await supabase.from('campaigns').select()

  /// ...resolve loader

  return json({ campaigns, session })
}

export default function Index() {
  const { campaigns, session } = useLoaderData()
  const actionData = useActionData()

  if (session) {
    return (
      <div className="flex flex-col gap-2 py-10">
        {
          campaigns.map(campaign => (
            <div className="flex gap-20 align-middle" key={`campaign-${campaign.id}`}>
              <h2 className="text-2xl font-bold">{campaign.name}</h2>
              <div className="flex gap-10 h-full my-auto">
                <span>{campaign.dm_name}</span>
                <span>{campaign.time_descriptor}</span>
                <span>{campaign.location_descriptor}</span>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  return <div className="italic text-5xl text-center my-24">Coming soon.</div>
}
