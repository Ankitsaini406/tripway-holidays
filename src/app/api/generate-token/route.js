import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { uid } = await req.json();
        const secretKey = process.env.JWT_SECRET_KEY;

        if (!secretKey) {
            return NextResponse.json({ error: "JWT secret key is missing." }, { status: 500 });
        }

        const token = jwt.sign({ uid }, secretKey, { expiresIn: '7d' });

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error generating token." }, { status: 500 });
    }
}
