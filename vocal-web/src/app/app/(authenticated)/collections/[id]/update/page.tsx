import NewCollectionClient from '../../../(with-header)/collections/create/components/NewCollectionClient'

export default async function Page(props) {
  return <NewCollectionClient collectionId={props.params.id} />
}
