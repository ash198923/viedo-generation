const express = require('express');
const app = express();
const port = 3000;
const videoshow = require('videoshow');
const path = require('path');
const fs = require('fs');

app.use(express.static('../frontend'));
app.use(express.static('videos'));
app.use(express.json());

app.post('/generate', (req, res) => {
    const { text } = req.body;
    const images = [
        // For simplicity, using a single placeholder image.
        // In a real application, you would generate images from the text.
        { path: path.join(__dirname, '..', 'frontend', 'placeholder.png'), loop: 5 }
    ];

    const videoOptions = {
        fps: 25,
        loop: 5, // seconds
        transition: true,
        transitionDuration: 1, // seconds
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x?',
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
