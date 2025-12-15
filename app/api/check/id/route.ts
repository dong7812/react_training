import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { ok: false, msg: 'ID is required' },
        { status: 400 }
      );
    }

    // 아이디 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { id: uid },
    });

    if (existingUser) {
      return NextResponse.json({ ok: false, msg: 'ID already exists' });
    }

    return NextResponse.json({ ok: true, msg: 'ID is available' });
  } catch (error) {
    console.error('ID check error:', error);
    return NextResponse.json(
      { ok: false, msg: 'Server error' },
      { status: 500 }
    );
  }
}
