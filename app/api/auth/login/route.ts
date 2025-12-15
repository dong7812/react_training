import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { uid, password } = await request.json();

    if (!uid || !password) {
      return NextResponse.json(
        { ok: false, msg: 'ID and password are required' },
        { status: 400 }
      );
    }

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { id: uid },
    });
    
    if (!user) {
      return NextResponse.json(
        { ok: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { ok: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 로그인 성공
    return NextResponse.json({
      ok: true,
      stastus: 200,
      msg: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { ok: false, msg: 'Server error' },
      { status: 500 }
    );
  }
}
