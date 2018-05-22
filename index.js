var stat = require("fs").stat;
var spawn = require("child_process").spawn;

module.exports = async function() {
  // Convert arguments to actual array.
  var args= Array.prototype.slice.call(arguments);;
  return new Promise((resolve, reject) => {
    var src;
    var options;
    var callback;
    var pdSpawn;
    var result = "";
    var isURL;

    // Event Handlers
    var onStdOutData;
    var onStdOutEnd;
    var onStdErrData;
    var onStatCheck;

    isURL = function(src) {
      return /^(https?|ftp):\/\//i.test(src);
    };

    onStdOutData = function(data) {
      result += data;
    };

    onStdOutEnd = function() {
      console.log('Finish')
      resolve(result || true);
      pdSpawn.kill('SIGINT');      
    };

    onStdErrData = function(err) {
      reject(new Error(err));
      pdSpawn.kill('SIGINT');
    };

    onStatCheck = function(err, stats) {
      // If src is a file or valid web URL, push the src back into args array
      if ((stats && stats.isFile()) || isURL) {
        args.unshift(src);
      }

      // Create child_process.spawn
      pdSpawn = spawn("inkscape", args, options);

      // If src is not a file, assume a string input.
      if (typeof stats === "undefined" && !isURL) {
        pdSpawn.stdin.end(src, "utf-8");
      }

      // Set handlers...
      pdSpawn.stdout.on("data", onStdOutData);
      pdSpawn.stdout.on("end", onStdOutEnd);
      pdSpawn.on("error", onStdErrData);
    };

    // Save src out of the args array.
    src = args.shift();
    // Check if src is URL match.
    isURL = isURL(src);

    // At this point, args array should be atlest .length
    // of 1. If .length is 2, we have an Options object.
    if (args.length == 2 && args[1].constructor !== Array) {
      options = args.pop();
    }

    // Pull only remaining element from
    // the args Array and overwrite itself.
    args = args.shift();

    // Array of arguments are required for inkscape.
    // If arguments are in String format, convert
    // them to an array to use
    // in the child_process.spawn() call.
    if (args.constructor === String) {
      args = args.split(" ");
    }

    // Check file status of src
    stat(src, onStatCheck);
  });
};
