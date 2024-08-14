import { NextRequest, NextResponse } from "next/server";
import * as line from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN!,
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
};

const client = new line.Client(config);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json(); // リクエストボディからメッセージを取得
    console.log("message", message);

    await client.pushMessage(process.env.LINE_GROUP_ID!, {
      type: "text",
      text: message,
    });

    return NextResponse.json({
      message: `${message}というメッセージが送信されました。`,
    });
  } catch (e) {
    return NextResponse.json({ message: `error! ${e}` }, { status: 500 });
  }
}
