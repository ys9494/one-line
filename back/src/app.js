const http = require("http");
const express = require("express");
const loader = require("./loader");
const config = require("./config");
const AppError = require("./misc/AppError");
const commonErrors = require("./misc/commonErrors");
const apiRouter = require("./router");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");

async function create() {
  // MysqlDB에 연결

  await loader.connectMysqlDB();

  console.log("express application을 초기화합니다.");
  const expressApp = express();

  if (process.env.NODE_ENV === "production") {
    expressApp.use(logger("combined"));
    expressApp.use(hpp());
    expressApp.use(helmet({ contentSecurityPolicy: false }));
    expressApp.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
  } else {
    console.log("log", process.env.NODE_ENV);
    expressApp.use(logger("dev"));
    expressApp.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
  }

  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));

  expressApp.use(cookieParser());

  // Health check API
  expressApp.get("/health", (req, res, next) => {
    res.json({
      status: "OK",
    });
  });

  // version 1의 api router를 등록
  expressApp.use("/api/v1", apiRouter.v1);

  // 해당되는 URL이 없을 때를 대비한 미들웨어
  expressApp.use((req, res, next) => {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        404,
        "Resource not found"
      )
    );
  });

  // 에러 핸들러 등록
  expressApp.use((error, req, res, next) => {
    console.log(error);
    res.statusCode = error.httpCode ?? 500;
    res.json({
      data: null,
      error: error.message,
    });
  });
  console.log("express application 준비가 완료되었습니다.");

  // express와 http.Server을 분리해서 관리하기 위함.
  const server = http.createServer(expressApp);

  const app = {
    start() {
      server.listen(config.port);
      server.on("listening", () => {
        console.log(`🚀 게시판 서버가 포트 ${config.port}에서 운영중입니다.`);
      });
    },
    stop() {
      console.log("🔥 서버를 중지 작업을 시작합니다.");
      this.isShuttingDown = true;
      return new Promise((resolve, reject) => {
        server.close(async (error) => {
          if (error !== undefined) {
            console.log(`- HTTP 서버 중지를 실패하였습니다: ${error.message}`);
            reject(error);
          }
          console.log("- 들어오는 커넥션을 더 이상 받지 않도록 하였습니다.");
          await loader.disconnectMysqlDB();
          console.log("- DB 커넥션을 정상적으로 끊었습니다.");
          console.log("🟢 서버 중지 작업을 성공적으로 마쳤습니다.");
          this.isShuttingDown = false;
          resolve();
        });
      });
    },
    isShuttingDown: false,
    _app: expressApp,
  };

  return app;
}

module.exports = create;
