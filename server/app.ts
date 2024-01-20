// app.ts
import { Application, Router, walk } from "./deps.ts";

const app = new Application();
const router = new Router();

router.get("/pdf", async (context) => {
  const files: string[] = [];
  for await (const entry of walk("./res", {
    includeDirs: false,
    includeFiles: true,
  })) {
    files.push(entry.path.split("/").pop() as string);
  }
  context.response.body = files;
});

router.get("/pdf/:name", async (context) => {
  for await (const entry of walk("./res", {
    includeDirs: false,
    includeFiles: true,
  })) {
    if (entry.path.includes(context.params.name)) {
      const fileContent = await Deno.readFile(entry.path);
      context.response.headers.set("Content-Type", "application/pdf");
      context.response.headers.set(
        "Content-Disposition",
        `attachment; filename="${entry.path.split("/").pop()}"`
      );
      context.response.body = fileContent;
      break;
    }
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
