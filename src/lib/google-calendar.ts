import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/calendar/callback";

  if (!clientId || !clientSecret) return null;

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export function getAuthUrl() {
  const client = getOAuth2Client();
  if (!client) return null;

  return client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
}

export async function getCalendarClient(tokens: { access_token: string; refresh_token: string }) {
  const client = getOAuth2Client();
  if (!client) return null;

  client.setCredentials(tokens);

  // Auto-refresh token
  client.on("tokens", () => {
    // Tokens are refreshed automatically
  });

  return google.calendar({ version: "v3", auth: client });
}

export async function getFreeBusy(
  tokens: { access_token: string; refresh_token: string },
  timeMin: string,
  timeMax: string
) {
  const calendar = await getCalendarClient(tokens);
  if (!calendar) return [];

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: "America/Sao_Paulo",
      items: [{ id: "primary" }],
    },
  });

  return res.data.calendars?.primary?.busy || [];
}

export async function createEvent(
  tokens: { access_token: string; refresh_token: string },
  event: {
    summary: string;
    description?: string;
    startDateTime: string;
    endDateTime: string;
  }
) {
  const calendar = await getCalendarClient(tokens);
  if (!calendar) return null;

  const res = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: event.summary,
      description: event.description,
      start: { dateTime: event.startDateTime, timeZone: "America/Sao_Paulo" },
      end: { dateTime: event.endDateTime, timeZone: "America/Sao_Paulo" },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 60 },
          { method: "popup", minutes: 15 },
        ],
      },
    },
  });

  return res.data;
}
