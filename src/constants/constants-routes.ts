export const constTexts = {
  authRoute: {
    name: "auth",
    login: "signin",
    adminLogin: "adminSignin",
    supportLogin: "supportLogin",
    moderatorLogin: "moderatorLogin",
    signUp: "signup",
    forgetPassword: "forget-password",
    resetPassword: "reset-password",
    verifyOtp: "verify-otp",
    me: "me",
    phoneAuth: "phoneAuth",
    verifyPhoneOTP: "verifyPhoneOTP",
    phoneAuthUpdate: "phoneAuthUpdate",
    socialAuth: "socialAuth",
    verifyAccount: "verifyEmail",
    otpResend: "otpResend",
    logOut: "logOut",
    blockUserAccount: "blockUserAccount/:id",
  },
  postRoute: {
    name: "post",
    getAllPosts: "getAllPosts",
    my: "myPost",
    specific: "specific",
    reply: "reply",
    completedByOther: "completedByOther",
    update: ":id",
    delete: ":id",
    details: "details/:id",
    deleteImage: "deleteImage/:id",
    search: "search",
  },
  commentRoute: {
    name: "comment",
    my: "myreply",
    specific: "specific",
    post: "post",
    update: ":id",
    delete: ":id",
    details: "details/:id",
    search: "search",
  },
  mailRoute: {
    name: "mail",
    report: "report",
    contactUs: "contactUs",
  },

  policiesRoute: {
    name: "policy",
    privacy: "privacy",
    teramAndCond: "teramAndCond",
    refund: "refund",
    update: ":id",
    delete: ":id",
    getOne: ":id",
  },

  reviewsRoute: {
    name: "reviews",
    update: ":id",
    delete: ":id",
    getOne: ":id",
  },

  searcRoute: {
    name: "search",
    filter: "filter",
  },

  userRoute: {
    name: "users",
    otherUserProfile: "ViewOtherUserProfile/:id",
    allUsers: "allUsers",
    dashUsers: "dashUsersCount",
    delete: ":id",
    schema: "/schema",
    handleBlock: "handleBlock",
    deleteAccount: "deleteAccount",
    myprofile:"viewMyProfile"
  },

  chatRoute: {
    name: "chat",
    inbox: "inbox",
    detail: ":id",
  },

  notifyRoute: {
    name: "notification",
    count: "count",
    chatCount: "chatCount",
    updateChat: "updateChat",
    detail: ":id",
    update: ":id",
  },
};
