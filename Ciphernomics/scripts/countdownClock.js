function countDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFunc = [];
  this.running = false;
}

countDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that  = this,
      diff,
      obj;
  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }
    obj = countDownTimer.parse(diff);
    that.tickFunc.forEach(function(func) {
      func.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
}
countDownTimer.prototype.onTick = function(func) {
  if (typeof func === 'function') {
    this.tickFunc.push(func);
  }
  return this;
};

countDownTimer.prototype.expired = function() {
  return !this.running;
}

countDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};
