const cron = require("node-cron");
const Issue = require("../models/Issue");

// Runs every 1 hour
const startEscalationJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("⏱️ Running escalation check...");

    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

    const issuesToEscalate = await Issue.find({
      status: "IN_PROGRESS",
      updatedAt: { $lte: sixHoursAgo },
    });

    for (let issue of issuesToEscalate) {
      issue.status = "ESCALATED";
      issue.escalationLevel += 1;
      issue.escalatedAt = new Date();
      issue.assignedAuthority = "Senior Municipal Officer";

      await issue.save();

      console.log(`🚨 Issue escalated: ${issue._id}`);
    }
  });
};

module.exports = startEscalationJob;
