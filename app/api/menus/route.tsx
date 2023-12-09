import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // await sleep()
    const menus = await prisma.menu.findMany();
   // const subMenus = await prisma.subMenu.findMany();
    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در واکشی اطلاعات" },
      { status: 500 }
    );
  }
}

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 600000));
}
