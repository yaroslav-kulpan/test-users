const { execSync } = require('child_process');

// Function to run a shell command and log its output
function runCommand(command) {
  try {
    const output = execSync(command, { stdio: 'inherit' }); // 'inherit' allows us to see the command's output in the console
    return output;
  } catch (error) {
    console.error(`Failed to execute command: ${command}`, error);
    process.exit(1); // Exit script with error code 1
  }
}

console.log('Starting production server...');
runCommand('cd ./apps/api && npm run start');
