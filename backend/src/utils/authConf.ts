import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export default function passport_google_conf() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                callbackURL: "/auth/google/callback",
                scope: [
                    "profile",
                    "email",
                    "https://www.googleapis.com/auth/calendar.events",
                    "https://www.googleapis.com/auth/calendar.events.owned"
                    ]
            },
            (accessToken, refreshToken, profile, done) => {
                return done(null, {...profile, accessToken});
            }
        )
    );
    
    passport.serializeUser((user: Express.User, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((obj: any, done) => {
        done(null, obj);
    });
}