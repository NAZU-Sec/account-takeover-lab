# Account Takeover Lab 🚀

![GitHub stars](https://img.shields.io/github/stars/NAZU-Sec/account-takeover-lab?style=social)
![GitHub forks](https://img.shields.io/github/forks/NAZU-Sec/account-takeover-lab?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/NAZU-Sec/account-takeover-lab?style=social)

## About

Account Takeover Lab is a Node.js application that simulates real-world vulnerabilities and teaches users how to exploit them in a safe and legal environment. The application is designed to be a fun and engaging way to learn about web security and ethical hacking.

The application consists of a dashboard with four levels of challenges, each with increasing levels of difficulty:

- Level 1 (easy): Introduces users to basic vulnerabilities such as weak passwords and brute force attacks.
- Level 2 (medium): Covers more Intermediate-advanced topics such as session fixation, client-side weaknesses, and Cross-Site Request Forgery (CSRF).
- Level 3 (hard): Teaches users about Cross-Site Scripting (XSS), OAuth vulnerabilities, and logic flows.
- Level 4 (very hard): Covers advanced topics such as file upload vulnerabilities, Remote Code Execution (RCE), and privilege escalation.

The application is built using Node.js, Express.js, and EJS, and follows the MVC model. The user interface is simple and intuitive, making it easy for users to navigate and complete challenges.

In addition to the challenges, the application includes a leaderboard to encourage competition and engagement. The leaderboard displays the top users with the highest points earned.

Account Takeover Lab is a great resource for anyone interested in learning about web security and ethical hacking. Whether you're a beginner or an experienced security professional, there's something for everyone in this application.

## Features

- Dockerized application for easy deployment
- Multiple challenges with varying levels of difficulty
- Leaderboard to encourage competition and engagement
- No authentication or database storage required
- Utilizes Redis or cookies to store user data locally

## Getting Started

To get started with Account Takeover Lab, follow these steps:

1. Clone the repository: `git clone https://github.com/NAZU-Sec/account-takeover-lab.git`
2. Navigate to the root app folder: `cd account-takeover-lab`
3. Build the Docker image: `docker build -t account-takeover-lab .`
4. Run the Docker container: `docker run -p 8080:8080 -d account-takeover-lab`
5. Access the application in your web browser: `http://localhost:8080`

## Technologies Used

- Node.js
- Express.js
- Docker
- Alpine Linux
- Redis (optional)
- Cookies (optional)

## Challenges

- Weak Passwords
- Brute Force Attacks
- Session Fixation
- Client-Side Weaknesses
- Cross-Site Request Forgery (CSRF)
- Cross-Site Scripting (XSS)
- OAuth Vulnerabilities
- Logic Flows
- File Upload Vulnerabilities
- Remote Code Execution (RCE)
- Privilege Escalation

Write-ups

To write a write-up, follow these steps:

1. Create a new folder under your username in the `writeup` folder.
2. Write your write-up in a markdown file and save it in the new folder.
3. Submit a pull request to add your write-up to the repository.


## Contributing

If you'd like to contribute to Account Takeover Lab, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b my-new-feature`
3. Make your changes and commit them: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Create a new pull request

## License

Account Takeover Lab is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact

If you have any questions or feedback, please feel free to contact me at [nazu.discorde@gmail.com](mailto:nazu.discorde@gmail.com).

![GitHub followers](https://img.shields.io/github/followers/mrnazu_?style=social)
![Twitter followers](https://img.shields.io/twitter/follow/mrnazu_?style=social)

## Acknowledgments

- [Nazu Sec (Owner)](https://github.com/NAZU-Sec)

