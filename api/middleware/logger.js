const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logLevels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

class Logger {
  constructor() {
    this.logsDir = logsDir;
  }

  formatLog(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
    return `[${timestamp}] [${level}] ${message} ${metaStr}`;
  }

  writeLog(level, message, meta = {}) {
    const logMessage = this.formatLog(level, message, meta);
    console.log(logMessage);

    // Write to file based on environment
    if (process.env.NODE_ENV === 'production') {
      const logFile = path.join(this.logsDir, `${level.toLowerCase()}.log`);
      fs.appendFileSync(logFile, logMessage + '\n');
    }
  }

  error(message, meta = {}) {
    this.writeLog(logLevels.ERROR, message, meta);
  }

  warn(message, meta = {}) {
    this.writeLog(logLevels.WARN, message, meta);
  }

  info(message, meta = {}) {
    if (process.env.NODE_ENV !== 'test') {
      this.writeLog(logLevels.INFO, message, meta);
    }
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      this.writeLog(logLevels.DEBUG, message, meta);
    }
  }
}

module.exports = new Logger();
