import { firestore } from '@/services/firestore'
import { NextResponse } from 'next/server'
import { TABLE_NAMES } from '@/constant'


export const GET = async (_, { params }) => {
  try {
    const result = await firestore
      .collection(TABLE_NAMES.collections)
      .doc(params.id)
      .get()
      .then((res) => res.data())
    return NextResponse.json(result)
  } catch (e) {
    return new Response(e, {
      status: 500,
    })
  }
}

export const DELETE = async (_, { params }) => {
  try {
    const result = await firestore.collection(TABLE_NAMES.collections).doc(params.id).delete()

    return NextResponse.json(result)
  } catch (e) {
    return new Response(e, { status: 500 })
  }
}

export const PUT = async (req, { params }) => {
  const body = await req.json()
  try {
    const doc = await firestore.collection(TABLE_NAMES.collections).doc(params.id)

    let result = await doc.set(body)

    return NextResponse.json(result)
  } catch (e) {
    return new Response(e, {
      status: 500,
    })
  }
}
