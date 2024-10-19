import { TABLE_NAMES } from '@/constant'
import { firestore } from '@/services/firestore'
import { currentUser } from '@clerk/nextjs/server'
import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.search)

  const offset = Number(searchParams.get('offset') || 0)
  const limit = Number(searchParams.get('limit') || 10)
  const tag = searchParams.get('tag')?.trim() ?? ''
  const name = searchParams.get('name')?.trim() ?? ''
  const userId = searchParams.get('userId')?.trim() ?? ''

  try {
    let ref = firestore.collection(TABLE_NAMES.collections)

    if (tag) {
      ref = ref.where('tags', 'array-contains', tag)
    }
    console.log('name', name)
    if (name) {
      ref = ref
        .where('nameLowercase', '>=', name)
        .where('nameLowercase', '<=', name + '\uf8ff')
        .orderBy('nameLowercase', 'asc')
    }

    if (userId) {
      ref = ref.where('createdBy', '==', userId)
    }

    const result = await ref
      .where('public', '==', true)
      .orderBy('used', 'desc')
      .offset(offset)
      .limit(limit)
      .get()
      .then((docSnapshot) => {
        const d = []
        docSnapshot.forEach((doc) => {
          d.push(doc.data())
        })
        return d
      })
    return NextResponse.json(result)
  } catch (e) {
    return new Response(e, {
      status: 500,
    })
  }
}

export const POST = async (req) => {
  const user = await currentUser()
  const body = await req.json()
  const id = body.id ?? randomUUID()

  try {
    const doc = await firestore.collection(TABLE_NAMES.collections).doc(id)
    const payload = {
      id,
      ...body,
      createdBy: user?.id,
      createdAt: new Date(),
    }
    let result = await doc.set(payload, { merge: true })

    return NextResponse.json(result)
  } catch (e) {
    return new Response(e, {
      status: 500,
    })
  }
}
