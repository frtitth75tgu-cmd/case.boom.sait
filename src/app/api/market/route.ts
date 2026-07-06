import { NextResponse } from "next/server";
export async function GET(){
 return NextResponse.json({
  ok:true,
  providerUrl:process.env.MARKET_API_URL||"",
  note:"Заготовка под market URL для авто-цен и авто-закупки. Следующий этап — подключить конкретный provider API."
 });
}
