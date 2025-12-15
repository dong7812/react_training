import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📦 Received body:', JSON.stringify(body, null, 2));

    const { uid, pw, name, nickName } = body;
    console.log('🔍 Parsed fields:', {
      uid: uid || 'MISSING',
      pw: pw ? '***' : 'MISSING',
      name: name || 'MISSING',
      nickName: nickName || 'MISSING'
    });

    // 필수 필드 검증
    if (!uid || !pw || !name || !nickName) {
      console.log('❌ Validation failed - missing required fields');
      return NextResponse.json(
        { ok: false, msg: 'All fields are required', received: body },
        { status: 400 }
      );
    }

    // 아이디 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { id: uid },
    });

    if (existingUser) {
      return NextResponse.json(
        { ok: false, msg: 'ID already exists' },
        { status: 409 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(pw, 10);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        id: uid,
        password: hashedPassword,
        name: name,
        nickname: nickName
      },
    });

    return NextResponse.json({
      ok: true,
      msg: 'User created successfully',
      user: {
        id: user.id,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json(
      { ok: false, msg: 'Server error' },
      { status: 500 }
    );
  }
}
