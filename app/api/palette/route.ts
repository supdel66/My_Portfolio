import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const response = await fetch(
      "https://web-production-32c2c.up.railway.app/palette",
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error(`Palette API responded with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Palette API error:", error)
    return NextResponse.json(
      { error: "Failed to generate palette" },
      { status: 500 }
    )
  }
}
