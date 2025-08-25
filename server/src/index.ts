import Elysia from "elysia";
import { privateRoutes } from "./plugins/privates.plugin";
import { initiateAdmin } from "./config/admin.config";
import { authPlugin } from "./plugins/auth.plugin";
import cors from "@elysiajs/cors";
import { overviewPlugin } from "./plugins/overview.plugin";
import { deleteLogs } from "./jobs/logs.job";

console.time("Server Execution time");
new Elysia()
    .onError(({ code, status, set }) => {
      if (code === 'NOT_FOUND') return status(404, {
          success: false,
          status: 404,
          message: "Route not found"
      })
        // code can be "UNKNOWN" | "VALIDATION" | "NOT_FOUND" | "PARSE" | "INTERNAL_SERVER_ERROR" | "INVALID_COOKIE_SIGNATURE" | "INVALID_FILE_TYPE"
      // or number based on http status
    })
  .get("/", () => "Hello Elysia")
  .use(cors())
  .use(initiateAdmin)
  .use(overviewPlugin)
  .use(authPlugin)
  .use(privateRoutes)
  .use(deleteLogs)
  .listen(3000);

console.timeEnd("Server Execution time");
console.log("Server is up and running ...")