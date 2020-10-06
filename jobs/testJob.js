function testJob({ attrs: { name, data } }, done) {
  console.log("Starting test job " + name);
  console.log(data);
  if (data.fail) {
    throw new Error("Error!");
  }
  done();
}

module.exports = {
  jobName: "test-job",
  jobFn: testJob,
};
