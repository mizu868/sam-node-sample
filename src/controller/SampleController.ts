export class SampleController {
  async getSample() {
    const sampleEnv = process.env.SAMPLE_ENV;
    return sampleEnv;
  }
}
