import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

app.use(bodyParser.json());

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

interface Database {
    submissions: Submission[];
}

// Initialize the database if it doesn't exist
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify({ submissions: [] }, null, 2));
}

// Helper function to read the database
const readDatabase = (): Database => {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data.toString());
};

// Helper function to write to the database
const writeDatabase = (data: Database) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// /ping endpoint
app.get('/ping', (req, res) => {
    res.send(true);
});

// /submit endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const db = readDatabase();
    console.log("Request", req.body);
    db.submissions.push({ name, email, phone, github_link, stopwatch_time,  });
    writeDatabase(db);
    res.send({ success: true });
});

// /read endpoint
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    const db = readDatabase();
    if (index >= 0 && index < db.submissions.length) {
        res.send(db.submissions[index]);
    } else {
        res.status(404).send({ error: 'Index out of range' });
    }
});

app.get('/count', (req, res) => {
    const db = readDatabase();
    res.send({ "count": db.submissions.length })
})

// /edit endpoint
app.put('/edit', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    console.log('Headers:', req.headers);
    console.log('Request Body:', req.body);

    if (isNaN(index) || index < 0) {
        res.status(400).send({ error: 'Invalid index' });
        return;
    }

    if (name && email && phone && github_link && stopwatch_time) {
        const db = readDatabase();
        if (index >= 0 && index < db.submissions.length) {
            db.submissions[index] = { name, email, phone, github_link, stopwatch_time };
            writeDatabase(db);
            res.send({ success: true });
        } else {
            res.status(404).send({ error: 'Index out of range' });
        }
    } else {
        res.status(400).send({ error: 'Missing required fields' });
    }
});

// /delete endpoint
app.delete('/delete', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    console.log(index);

    if (isNaN(index) || index < 0) {
        res.status(400).send({ error: 'Invalid index' });
        return;
    }

    const db = readDatabase();
    if (index >= 0 && index < db.submissions.length) {
        db.submissions.splice(index, 1);
        writeDatabase(db);
        res.status(200).send({ success: true });
    } else {
        res.status(404).send({ error: 'Index out of range' });
    }
});

// /search endpoint
app.get('/search', (req, res) => {
    const email = req.query.email as string;
    const db = readDatabase();
    const submissions = db.submissions
    const results = submissions.filter(submission => submission.email === email);
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
