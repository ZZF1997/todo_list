'use strict';

const Mocha = require('mocha');
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END,
} = Mocha.Runner.constants;

// this reporter outputs test results, indenting two spaces per suite
class MyReporter {
  constructor(runner) {
    this._indents = 0;
    const stats = runner.stats;

    runner
      .once(EVENT_RUN_BEGIN, () => {
        console.log('start');
      })
      .on(EVENT_SUITE_BEGIN, () => {
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, () => {
        this.decreaseIndent();
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(
          `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`,
        );
      })
      .once(EVENT_RUN_END, () => {
        console.log('pass-percentage:', stats.passes / (stats.passes + stats.failures) * 100);
      });
  }

  indent() {
    return Array(this._indents).join('  ');
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }
}

module.exports = MyReporter;
