
import { httpClient } from '@/services/httpClient'
import axios from 'axios'
import NewCollectionClient from '../../create/components/NewCollectionClient'

export default async function Page(props) {
  // console.log('props', props, props.params.id)
  // const data = await httpClient.get(`http://localhost:3000/collections/${props.params.id}`).then((r) => r.data)
  // if (!data) {
  //   return <div>Not found</div>
  // }

  return <NewCollectionClient collectionId={props.params.id} />
}
