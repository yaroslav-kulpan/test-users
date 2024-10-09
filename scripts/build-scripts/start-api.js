const { execSync } = require('child_process');

function runCommand(command) {
  try {
    const output = execSync(command, { stdio: ['inherit', 'pipe', 'pipe'] });
    console.log(`Command output: ${output}`);
    return output;
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    console.error(`Error status: ${error.status}`);
    console.error(`Error message: ${error.message}`);
    console.error(`Stdout: ${error.stdout?.toString()}`);
    console.error(`Stderr: ${error.stderr?.toString()}`);
    process.exit(1); // Exit script with error code 1
  }
}

runCommand('cd apps/api && npm run start');
