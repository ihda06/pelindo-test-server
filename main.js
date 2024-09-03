import express from "express";
import cors from "cors";
import { connOracle } from "./connection.js";
import { errResponse, response } from "./response.js";
import pkg from "oracledb";
import { checkMissingFields } from "./utils.js";

const app = express();
const port = 2020;
const { OUT_FORMAT_OBJECT } = pkg;

app.use(
  cors({
    origin: "http://localhost:2000",
  })
);

app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const result = await (
      await connOracle
    ).execute("SELECT id, title, description, status FROM task", [], {
      outFormat: OUT_FORMAT_OBJECT,
    });

    response(res, result.rows, 200, "success");
  } catch (error) {
    response(res, error, 400, "failed");
  }
});
app.get("/tasks/:id", async (req, res) => {
  try {
    const result = await (
      await connOracle
    ).execute(
      `SELECT id, title, description, status FROM task WHERE id = ${req.params.id}`,
      [],
      {
        outFormat: OUT_FORMAT_OBJECT,
      }
    );

    response(res, result.rows, 200, "success");
  } catch (error) {
    response(res, error, 400, "failed");
  }
});

app.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;

  const errorMessages = checkMissingFields(req.body, [
    "title",
    "description",
    "status",
  ]);
  if (errorMessages.length > 0) {
    return errResponse(res, undefined, 400, errorMessages, "failed");
  }
  try {
    const result = await (
      await connOracle
    ).execute(
      `INSERT INTO task(title, description, status) VALUES('${title}', '${description}', ${
        status === "completed" ? 1 : 0
      })`,
      [],
      {
        autoCommit: true,
      }
    );

    response(res, req.body, 200, "Task created successfully");
  } catch (error) {
    response(res, error, 400, "failed");
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { title, description, status } = req.body;

  try {
    await (
      await connOracle
    ).execute(
      `UPDATE task SET id = ${req.params.id}, ${
        title ? `title = '${title}',` : ""
      } ${description ? `description = '${description}',` : ""} ${
        status ? `status = ${status === "completed" ? 1 : 0}` : ""
      }  WHERE id = ${req.params.id}`,
      [],
      {
        autoCommit: true,
      }
    );

    response(res, req.body, 200, "Task updated successfully");
  } catch (error) {
    response(res, error, 400, "failed");
  }
});
app.delete("/tasks/:id", async (req, res) => {
  try {
    await (
      await connOracle
    ).execute(`DELETE FROM task WHERE id = ${req.params.id}`, [], {
      autoCommit: true,
    });

    response(res, req.body, 200, "Task deleted successfully");
  } catch (error) {
    response(res, error, 400, "failed");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
