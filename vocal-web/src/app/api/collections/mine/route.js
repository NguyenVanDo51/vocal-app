import { TABLE_NAMES } from "@/constant"
import { firestore } from "@/services/firestore"
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const user = await currentUser()
    console.log("user", user)
    const result = await firestore
      .collection(TABLE_NAMES.collections)
      .where("createdBy", "==", user?.id)
      .orderBy("createdAt", "desc")
      .get()

    const bots = []
    result?.forEach((b) => {
      bots.push(JSON.parse(JSON.stringify(b.data())))
    })
    return NextResponse.json(bots)
  } catch (e) {
    return new Response(e, {
      status: 500,
    })
  }
}
