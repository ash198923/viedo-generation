const generateBtn = document.getElementById('generate-btn');
const textInput = document.getElementById('text-input');
const videoOutput = document.getElementById('video-output');

generateBtn.addEventListener('click', () => {
    const text = textInput.value;
    videoOutput.innerHTML = 'Generating video...';

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.videoUrl) {
            videoOutput.innerHTML = `<video width=\"100%\" controls src=\"${data.videoUrl}\"></video>`;
        } else {
            videoOutput.innerHTML = 'Error generating video.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        videoOutput.innerHTML = 'Error generating video.';
    });
});
