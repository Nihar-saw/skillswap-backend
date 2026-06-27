const express = require("express");
const proposalRoutes = require("./routes/proposalRoutes");
const teamRoutes = require("./routes/teamRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const walletRoutes = require("./routes/walletRoutes");
const projectRoutes = require("./routes/projectRoutes");
const startupRoutes = require("./routes/startupRoutes")
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes= require("./routes/notificationRoutes");
const activityRoutes= require("./routes/activityRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const fileRoutes =require("./routes/fileRoutes");
const githubRoutes = require("./routes/githubRoutes");
const teamMatchRoutes = require("./routes/teamMatchRoutes");
const { protect } = require("./middleware/authMiddleware");
const { analyze } = require("./controllers/startupAIController");
const projectHealthRoutes = require("./routes/projectHealthRoutes");
const deadlineRoutes = require("./routes/deadlineRoutes");
const workloadRoutes = require("./routes/workloadRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const architectureRoutes = require("./routes/architectureRoutes");
const aiManagerRoutes = require("./routes/aiManagerRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const screenShareRoutes = require("./routes/screenShareRoutes");
const whiteboardRoutes = require("./routes/whiteboardRoutes");
const codeRoutes = require("./routes/codeRoutes");
const securityMiddleware = require("./middleware/security");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(securityMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("SkillSwap API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/proposals",proposalRoutes);
app.use("/api/teams",teamRoutes);
app.use("/api/reviews",reviewRoutes);
app.use("/api/wallet",walletRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/files",fileRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/team-matches", teamMatchRoutes);
app.use("/api/startup-analysis", protect, analyze);
app.use("/api/project-health", projectHealthRoutes);
app.use("/api/deadline", deadlineRoutes);
app.use("/api/workload", workloadRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/architecture", architectureRoutes);
app.use("/api/ai-manager", aiManagerRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/screen-share", screenShareRoutes);
app.use("/api/whiteboard", whiteboardRoutes);
app.use("/api/code", codeRoutes);

app.use(errorHandler);

module.exports = app;
