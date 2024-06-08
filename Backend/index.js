
const http = require("http");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// REQUIRING ROUTES

const {
  flashCardSetRouter,
} = require("./api/routes/FlashCraft/FCSetRoute/flashCardSetRoute");
const { signupRouter } = require("./api/routes/LoginSignup/signupRoute");
const { loginRouter } = require("./api/routes/LoginSignup/loginRoute");
const { HomePageRouter } = require("./api/routes/HomePageRoute/homePageRoute");
const {
  slideRoute,
} = require("./api/routes/learningUnitRoutes/SlideRoute/slideRoute");
const {
  completeUnitRoute,
} = require("./api/routes/learningUnitRoutes/CompleteUnitRoute/completeUnitRoute");
const {
  router,
} = require("./api/routes/ChatSpaceRoutes/convoRoute/conversationRoute");
const {
  messageRouter,
} = require("./api/routes/ChatSpaceRoutes/messagesRoute/messagesRoute");
const {
  getUserRouter,
} = require("./api/routes/ChatSpaceRoutes/userRoute/getUserRoute");

const streakCalendarRoute = require('./api/routes/streakRoutes/streakCalendarRoute/streakCalendar');

// CONNECTING TO DATABASE
const streakLeaderboardRoute = require('./api/routes/streakLeaderboardRoute/streakLeaderboard');
const xpLeaderboardRoute = require('./api/routes/xpLeaderboardRoute/xpLeaderboardRoute');

const userDailyChallengeRoute = require('./api/routes/userChallengesroutes/userDailyChallengesRoute/userDailyChallengeRoute');
const userAchievementChallengeRoute = require('./api/routes/userChallengesroutes/userAchievementChallengesRoute/userAchievementChallenges');

require("dotenv").config();
const FriendshipHubRequestsRouter = require('./api/routes/FriendshipHubRoutes/FriendRequestsRoute/friendRequestsRoute');
const FriendshipHubFriendsRouter = require('./api/routes/FriendshipHubRoutes/UserFriendsRoute/userFriendsRoute');
const AnalyticsRoute = require('./api/routes/UserAnalyticsRoute/userAnalyticsRoute');
const UserStatsRoute = require('./api/routes/UserStatsRoute/userStats');

// IMPORTING .ENV VARIABLE
const port = process.env.PORT || 8000;
const jwtSecret = process.env.JWT_SECRET;

// CONNECTING TO DATABASE
require("./config/db");

// CREATING APP
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: jwtSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "None", // Adjust based on your requirements
      secure: process.env.NODE_ENV === "production", // Set to true in production
    },
  })
);
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: jwtSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "None", // Adjust based on your requirements
      secure: process.env.NODE_ENV === "production", // Set to true in production
    },
  })
);
// REGISTERING ROUTES
// FLashCraft routes
app.use("/api/FlashCraft", flashCardSetRouter);

// login signup routes
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/homepage", HomePageRouter);
app.use("/api/slides", slideRoute);
app.use("/api/completeUnit", completeUnitRoute);
app.use("/api/friendshiphub", FriendshipHubRequestsRouter);
app.use("/api/fh", FriendshipHubFriendsRouter);
app.use("/api/analytics", AnalyticsRoute);
app.use("/api/userStats", UserStatsRoute);
app.use("/api/conversation", router);
app.use("/api/messages", messageRouter);
app.use("/api/users", getUserRouter);
app.use("/xpleaderboard", xpLeaderboardRoute);
app.use("/streakLeaderboard", streakLeaderboardRoute);
app.use("/userDailyChallenge", userDailyChallengeRoute);
app.use("/userAchievementChallenge", userAchievementChallengeRoute);
app.use("/streak",streakCalendarRoute);
// CREATING SERVER
const server = http.createServer(app);

//LISTENING THE SERVER
server.listen(port, () => console.log(`Server listening on port ${port}`));