const { exec } = require('child_process');
const fs = require('fs');

console.log('Starting build...');
exec('npm run build > build_debug.log 2>&1', (error, stdout, stderr) => {
  if (error) {
    console.log('Build failed with code ' + error.code);
    try {
      const log = fs.readFileSync('build_debug.log', 'utf8');
      // Filter out lines that look like progress bars
      const lines = log.split('\n').filter((line) => !line.includes('[=') && line.trim() !== '');
      // Take the last 50 lines
      const lastLines = lines.slice(-50);
      console.log('--- ERROR LOG START ---');
      console.log(lastLines.join('\n'));
      console.log('--- ERROR LOG END ---');
    } catch (e) {
      console.log('Error reading log file: ' + e.message);
    }
  } else {
    console.log('Build success!');
  }
});
