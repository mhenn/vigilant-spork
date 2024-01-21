// app.ts
import { Application, Router, walk } from "./deps.ts";

const app = new Application();
const router = new Router();

router.get("/pdf", async (context) => {
  const files = await getResFiles();
  context.response.body = files.map((f: string) => f.split("/").pop());
});

router.get("/pdf/:name", async (context) => {
  const files = await getResFiles();
  const searchResult = files.filter((f) => f.includes(context.params.name));
  if (searchResult.length > 0 && context.params.name) {
    const searchedFiled = searchResult[0];
    const fileContent = await Deno.readFile(searchedFiled);
    context.response.headers.set("Content-Type", "application/pdf");
    context.response.headers.set(
      "Content-Disposition",
      `attachment; filename="${searchedFiled.split("/").pop()}"`
    );
    context.response.body = fileContent;
  }
});

async function getResFiles(): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of walk("./res", {
    includeDirs: false,
    includeFiles: true,
  })) {
    files.push(entry.path as string);
  }
  return files;
}

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
