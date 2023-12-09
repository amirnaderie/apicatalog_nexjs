import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // await sleep()
    noStore();
    const apis = await prisma.aPI.findMany({
      select: {
        id: true,
        name: true,
        desc: true,
        parentId: true,
        title: true,
        submenu: {
          select: {
            id: true,
            menu: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(apis, { status: 200 });
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
