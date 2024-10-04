# Children's Computer Time Monitoring System

## Table of Contents

- [Requirements](#requirements)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Requirements

### Process-C (Child's Application)

1. Startup and Authentication
- R1.1: Automatically start on system boot
- R1.2: Prompt for password input
- R1.3: Validate password against parent and child passwords
2. Parent Authentication Handling
- R2.1: If parent password is entered, wait for 60 minutes before prompting for password again
3. Time Management
- R3.1: Check if current time is within allowed usage periods
- R3.2: Display and/or announce time until next allowed usage period
- R3.3: Implement a 15-second grace period before system shutdown when outside allowed times
- R3.4: Allow password re-entry during the grace period to prevent shutdown
4. Child Authentication and Usage
- R4.1: Allow three password attempts for child login
- R4.2: Implement a 10-minute lockout after three failed attempts
- R4.3: Display remaining usage time and next available usage period upon successful login
- R4.4: Monitor and enforce usage time limits
5. Monitoring and Logging
- R5.1: Capture screen activity and keystrokes every minute
- R5.2: Store captured data securely
6. Real-time Updates
- R6.1: Continuously check for changes in usage schedules
- R6.2: Update and display new time limits when changes are detected
7. Shutdown Procedures
- R7.1: Warn user 1 minute before scheduled shutdown
- R7.2: Perform system shutdown at scheduled times or when usage limits are reached
8. Schedule Management
- R8.1: Read and interpret usage schedules from a synchronized text file
- R8.2: Support complex schedule formats (e.g., F06:00 T06:45 D60 I20 S150)

### Process-P (Parent's Application)

1. Schedule Management
- R9.1: View current usage schedules
- R9.2: Modify usage schedules
- R9.3: Save changes to the synchronized text file
2. Monitoring
- R10.1: View child's computer usage history
- R10.2: Access captured screen activity and keystrokes
3. Multi-User Support
- R11.1: Allow simultaneous access from multiple parent devices
- R11.2: Implement concurrency control to prevent data corruption
4. Cross-Platform Compatibility
- R12.1: Support various operating systems (Windows, Android, MacOS, iOS, Linux)
5. Data Synchronization
- R13.1: Ensure real-time synchronization of schedule changes across devices
6. User Interface
- R14.1: Provide an intuitive interface for schedule management and monitoring

### General System Requirements

1. Security
- R15.1: Implement secure storage for passwords and usage data
- R15.2: Ensure encrypted communication between Process-C and Process-P
2. Performance
- R16.1: Minimize system resource usage, especially for Process-C
3. Reliability
- R17.1: Ensure system stability and error handling
4. Scalability
- R18.1: Support multiple child profiles (for families with multiple children)

## Features

- Automatic startup on system boot
- Password-protected access
- Customizable time schedules for computer usage
- Real-time monitoring of screen activity and keystrokes
- Automatic shutdown based on predefined rules
- Parent and child interfaces

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/children-computer-monitor.git
   ```

2. Navigate to the project directory:
   ```
   cd children-computer-monitor
   ```

3. Install dependencies for both Process-C and Process-P:
   ```
   cd Process-C && npm install
   cd ../Process-P && npm install
   ```

## Usage

### Process-C (Child's Application)

1. Start the application:
   ```
   cd Process-C && npm start
   ```

2. Enter the child's password to access the system.

### Process-P (Parent's Application)

1. Start the application:
   ```
   cd Process-P && npm start
   ```

2. Use the interface to set time schedules and view usage history.

## Components

The system consists of two main components:

1. **Process-C (Child's Application)**
   - Runs on the child's computer
   - Manages login and usage time
   - Monitors screen activity and keystrokes
   - Enforces usage rules and schedules

2. **Process-P (Parent's Application)**
   - Allows parents to set and modify usage schedules
   - Provides an interface to view usage history
   - Synchronizes data with Process-C

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Electron](https://www.electronjs.org/).
- [Bootstrap](https://getbootstrap.com/).
