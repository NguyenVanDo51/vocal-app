import NewCollectionClient from '@/app/(auth)/new/components/NewCollectionClient'
import { httpClient } from '@/services/httpClient'
import axios from 'axios'

export default async function Page(props) {
  console.log('props', props, props.params.id)
  const data = await httpClient.get(`http://localhost:3000/api/collections/${props.params.id}`).then((r) => r.data)
  if (!data) {
    return <div>Not found</div>
  }

  return <NewCollectionClient initialValues={data} />
}
