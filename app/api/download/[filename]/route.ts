import path from "path";
import { readFile } from "fs/promises";

type GetParams = {
  params: {
    filename: string;
  };
};

// export an async GET function. This is a convention in NextJS
export async function GET(req: Request, { params }: GetParams) {
  // filename for the file that the user is trying to download
  const filename = params.filename;

  const buffer = await readFile(
    path.join(process.cwd(), "/public/files/", filename)
  );

  const ext=filename.slice(-4)

  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename=${filename}`);
  headers.append("Content-Type", ext==="docx"?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":"application/json");

  return new Response(buffer, {
    headers,
  });
}
