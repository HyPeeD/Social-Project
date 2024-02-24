const INSTAGRAM_PAGES_AUTH_URL = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=${process.env.FB_REDIRECT_URI}&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list`;

export { INSTAGRAM_PAGES_AUTH_URL };
