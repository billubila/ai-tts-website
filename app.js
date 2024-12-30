document.getElementById("convertBtn").addEventListener("click", async function () {
    const text = document.getElementById("inputText").value;
    if (text.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    try {
        // Call backend API to convert text to speech
        const response = await fetch('https://text-to-speech-backend-g1p9.onrender.com/api/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();

        if (data.audioUrl) {
            const audioPlayer = document.getElementById("audioPlayer");
            audioPlayer.src = data.audioUrl;
            audioPlayer.play();
        } else {
            alert("Error: Could not convert text to speech.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});
