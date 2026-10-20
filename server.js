const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
    // Escape quotes in the email body so it doesn't break the terminal command
    const emailBody = (req.body.emailBody || '').replace(/"/g, '\\"');
    console.log(`[${new Date().toLocaleTimeString()}] Received incoming email webhook.`);

    // Runs Antigravity using your exact OneDrive path
    const command = `agy --model "Claude Sonnet 4.6 (Thinking)" -p "Read /app/rules.txt and process this email: ${emailBody}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Execution error:', error);
            return res.status(500).json({ error: 'Failed to execute CLI' });
        }
        console.log('AI Output:\n', stdout);
        res.status(200).send(stdout);
    });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));