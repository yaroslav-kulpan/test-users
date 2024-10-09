const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Function to run a shell command and log its output
function runCommand(command) {
  try {
    const output = execSync(command, { stdio: 'inherit' }); // 'inherit' allows us to see the command's output in the console
    return output;
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    console.error(`Error status: ${error.status}`);
    console.error(`Error message: ${error.message}`);
    console.error(`Stderr: ${error.stderr}`);
    process.exit(1); // Exit script with error code 1
  }
}

function verifyDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    console.error(`Directory does not exist: ${directoryPath}`);
    process.exit(1); // Exit script with error code 1
  }
}

const apiDir = path.join(process.cwd(), './apps/api');

console.info(process.cwd());

verifyDirectoryExists(apiDir);

console.log('Starting production server...');
runCommand(`cd ${apiDir} && npm run start`);
