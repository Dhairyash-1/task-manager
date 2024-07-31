// lib/authMiddleware.ts

import { verify } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export interface AuthenticatedRequest extends NextRequest {
  userId?: string
}

export function authMiddleware(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  return async (req: AuthenticatedRequest) => {
    try {
      const token = req.cookies.get("accessToken")?.value

      if (!token) {
        return NextResponse.json(
          { error: "Token is not oufn" },
          { status: 500 }
        )
      }

      const decoded = verify(token, process.env.TOKEN_SECRET as string) as {
        id: string
      }

      req.userId = decoded.id

      return handler(req as AuthenticatedRequest)
    } catch (error) {
      return NextResponse.json({ error: "Invaild Token" }, { status: 500 })
    }
  }
}
