const createApp = require("../src/app");

async function main() {
  const app = await createApp();

  // 처리하지 못한 에러를 캐치하는 리스너 + 핸들러
  process.on("uncaughtException", (error) => {
    console.log(`uncaughtException: ${error}`);
  });

  // OS의 kill signal에 반응하도록 설정
  for (const signal of ["SIGTERM", "SIGHUP", "SIGINT", "SIGUSR2"]) {
    process.on(signal, async () => {
      if (!app.isShuttingDown) {
        console.log(
          `시스템 시그널, ${signal}을 수신하였습니다. 의도된 서버 중지 신호입니다. Graceful shutdown을 실시합니다.`
        );
        await app.stop();
        console.log(`Graceful shutdown이 완료되었습니다.`);
        console.log(`바이바이 👋`);
        process.exit(0);
      }
    });
  }

  // 전체 웹 어플리케이션 서버 시작
  app.start();
}

main();
