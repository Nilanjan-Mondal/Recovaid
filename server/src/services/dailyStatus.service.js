const { createStatusEntry, getStatusesByPatient, getStatusesByDoctor } = require("../repositories/dailyStatus.Repository");
const { generateImgContent, generateStrContent } = require("./aiReview.service");

async function createDailyStatusService(patientId, body) {
    const {
        doctorId, 
        symptoms,
        temperature,
        imageUrl
    } = body;

    let imgReviewText = "";
    let strReviewText = "";
    let imgScore = 0;
    let strScore = 0;

    try {
        // Prompt for text-based symptoms
        const textPrompt = `
            Symptoms: ${symptoms || "None provided"}
            Temperature: ${temperature || "N/A"}°F
        `;

        // Run AI reviews in parallel
        const [imgResult, strResult] = await Promise.all([
            imageUrl ? generateImgContent(imageUrl) : Promise.resolve(""),
            generateStrContent(textPrompt)
        ]);

        // --- Extract and clean AI results ---

        // Helper function to extract score and reason
        const extractScoreAndReason = (text) => {
            const scoreMatch = text.match(/Severity Score:\s*(\d+)/i);
            const reasonMatch = text.match(/Reason:\s*(.*)/i);
            const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
            const reason = reasonMatch ? reasonMatch[1].replace(/\n/g, "").trim() : "No reason provided";
            return { score, reason };
        };

        // Text AI
        const strData = extractScoreAndReason(strResult);
        strScore = strData.score;
        strReviewText = strData.reason;

        // Image AI (if present)
        if (imageUrl) {
            const imgData = extractScoreAndReason(imgResult);
            imgScore = imgData.score;
            imgReviewText = imgData.reason;
        }

    } catch (error) {
        console.error("AI evaluation failed:", error);
        imgReviewText = "Image analysis failed";
        strReviewText = "Text analysis failed";
    }

    // Final criticality score (average if image exists, else use text score only)
    const criticalityScore = imageUrl ? ((strScore + imgScore) / 2) : strScore;

    // Final combined AI summary
    const aiSummaryParts = [];
    if (imgReviewText && imageUrl) aiSummaryParts.push(`Image Analysis: ${imgReviewText}`);
    if (strReviewText) aiSummaryParts.push(`Patient Description: ${strReviewText}`);
    const aiSummary = aiSummaryParts.join(" ");

    const alertSent = criticalityScore >= 8;

    const newStatus = await createStatusEntry({
        patient: patientId,
        doctor: doctorId,
        symptoms,
        temperature,
        imageUrl,
        aiSummary,
        criticalityScore,
        alertSent
    });

    // Optional: alert system if implemented
    // if (alertSent) await sendCriticalAlertEmail(doctorId, aiSummary);

    return newStatus;
}

async function getPatientStatusesService(patientId) {
    return await getStatusesByPatient(patientId);
}

async function getDoctorStatusesService(doctorId) {
    return await getStatusesByDoctor(doctorId);
}

module.exports = {
    createDailyStatusService,
    getPatientStatusesService,
    getDoctorStatusesService
};
