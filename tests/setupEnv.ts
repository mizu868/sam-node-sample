export default (): void => {
  console.log("\nSetup test environment");
  process.env.SAMPLE_ENV = "testtt";
  console.log("process.env.ENV1", process.env.SAMPLE_ENV);
};
