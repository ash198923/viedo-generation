const express = require('express');
const app = express();
const port = 3000;
const videoshow = require('videoshow');
const path = require('path');
const fs = require('fs');

const videosDir = path.join(__dirname, 'videos');
if (!fs.existsSync(videosDir)){
    fs.mkdirSync(videosDir, { recursive: true });
}

app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use('/videos', express.static(videosDir));
app.use(express.json());

app.post('/generate', (req, res) => {
    const { text, format } = req.body;

    const imagePath = path.join(__dirname, '..', 'frontend', 'placeholder.png');
    if (!fs.existsSync(imagePath)) {
        return res.status(500).json({ error: 'placeholder.png not found on server. Please add it to the frontend directory and push your changes.' });
    }

    const images = [
        { path: imagePath, loop: 5 }
    ];

    const videoOptions = {
        fps: 25,
        loop: 5, // seconds
        transition: true,
        transitionDuration: 1, // seconds
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: format === 'tiktok' ? '1080x1920' : '1920x1080',
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p'
    };

    const videoPath = path.join(__dirname, 'videos', `${Date.now()}.mp4`);

    videoshow(images, videoOptions)
        .save(videoPath)
        .on('end', function () {
            res.json({ videoUrl: `/${path.basename(videoPath)}` });
        })
        .on('error', function (err) {
            console.error('Error:', err);
            res.status(500).send('Error generating video');
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
