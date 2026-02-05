// Mock functions for the exercise
function readFile(filename, callback) {
  console.log(`Reading ${filename}...`);
  setTimeout(() => {
    if (filename === 'error.txt') {
      callback(new Error(`Failed to read ${filename}`), null);
    } else {
      callback(null, `Content from ${filename}`);
    }
  }, 100);
}

function writeFile(filename, content, callback) {
  console.log(`Writing to ${filename}...`);
  setTimeout(() => {
    if (filename === 'error.txt') {
      callback(new Error(`Failed to write ${filename}`));
    } else {
      callback(null);
    }
  }, 100);
}

function sendEmail(to, subject, callback) {
  console.log(`Sending email to ${to}...`);
  setTimeout(() => {
    if (to === 'error@example.com') {
      callback(new Error(`Failed to send email`));
    } else {
      callback(null);
    }
  }, 100);
}

readFile('file1.txt', function (err, data1) {
  if (err) throw err;
  readFile('file2.txt', function (err, data2) {
    if (err) throw err;
    writeFile('output.txt', data1 + data2, function (err) {
      if (err) throw err;
      console.log('Files merged successfully!');
      sendEmail('admin@example.com', 'Files merged', function (err) {
        if (err) throw err;
        console.log('Notification sent!');
      });
    });
  });
});

// Solution

// Solution 1: Named Functions (Modular Approach)

// Named Functions Solution
console.log('Solution 1: -----------------> Named functions');
function handleNotification(err) {
  if (err) {
    console.error('Error sending notification:', err);
    return;
  }
  console.log('Notification sent!');
}

function sendNotificationEmail() {
  sendEmail('admin@example.com', 'Files merged', handleNotification);
}

function handleFileWritten(err) {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('Files merged successfully!');
  sendNotificationEmail();
}

function writeMergedContent(data1, data2) {
  writeFile('output.txt', data1 + data2, handleFileWritten);
}

function handleSecondFileRead(data1, err, data2) {
  if (err) {
    console.error('Error reading file2:', err);
    return;
  }
  writeMergedContent(data1, data2);
}

function readSecondFile(data1) {
  readFile('file2.txt', (err, data2) => {
    handleSecondFileRead(data1, err, data2);
  });
}

function handleFirstFileRead(err, data1) {
  if (err) {
    console.error('Error reading file1:', err);
    return;
  }
  readSecondFile(data1);
}

// Start the process
readFile('file1.txt', handleFirstFileRead);

// Solution 2: Promisify + Promise Chain

// First, promisify the callback functions
function promisifyReadFile(filename) {
  return new Promise((resolve, reject) => {
    readFile(filename, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function promisifyWriteFile(filename, content) {
  return new Promise((resolve, reject) => {
    writeFile(filename, content, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function promisifySendEmail(to, subject) {
  return new Promise((resolve, reject) => {
    sendEmail(to, subject, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Now use promise chain
let savedData1;

promisifyReadFile('file1.txt')
  .then((data1) => {
    savedData1 = data1;
    return promisifyReadFile('file2.txt');
  })
  .then((data2) => {
    const mergedContent = savedData1 + data2;
    return promisifyWriteFile('output.txt', mergedContent);
  })
  .then(() => {
    console.log('Files merged successfully!');
    return promisifySendEmail('admin@example.com', 'Files merged');
  })
  .then(() => {
    console.log('Notification sent!');
  })
  .catch((error) => {
    console.error('An error occurred:', error.message);
  });

//   Solution 3: Async/Await (Cleanest)

// Reuse the promisified functions from Solution 2

async function mergeFilesAndNotify() {
  try {
    // Read files sequentially
    const data1 = await promisifyReadFile('file1.txt');
    const data2 = await promisifyReadFile('file2.txt');

    // Write merged content
    await promisifyWriteFile('output.txt', data1 + data2);
    console.log('Files merged successfully!');

    // Send email notification
    await promisifySendEmail('admin@example.com', 'Files merged');
    console.log('Notification sent!');
  } catch (error) {
    console.error('Error during file operation:', error.message);
  }
}

// Execute
mergeFilesAndNotify();

// Solution 4: Async/Await with Parallel Execution
// Even more efficient with parallel execution
async function mergeFilesAndNotifyParallel() {
  try {
    // Read both files in parallel (they don't depend on each other)
    const [data1, data2] = await Promise.all([
      promisifyReadFile('file1.txt'),
      promisifyReadFile('file2.txt'),
    ]);

    await promisifyWriteFile('output.txt', data1 + data2);
    console.log('Files merged successfully!');

    await promisifySendEmail('admin@example.com', 'Files merged');
    console.log('Notification sent!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Execute
mergeFilesAndNotifyParallel();
