
// Native fetch used


async function testConfig() {
    try {
        console.log("Testing connection to https://anup-evoting-demo.loca.lt...");
        // Use a known endpoint. The server has /uploads but that might be 404 if directory empty or no index.
        // It accepts POST /api/verify-citizen.
        // Let's try to just hit the root, even if 404, it proves connection.
        const res = await fetch('https://anup-evoting-demo.loca.lt', {
            headers: { 'Bypass-Tunnel-Reminder': 'true' } // Attempt to bypass if possible
        });
        console.log(`Status: ${res.status}`);
        console.log(`Text: ${await res.text()}`);
    } catch (e) {
        console.error("Fetch failed:", e.message);
    }
}

testConfig();
