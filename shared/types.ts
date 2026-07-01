export type CountryCode =
  | "ph"
  | "sg"
  | "my"
  | "hk"
  | "hk-en"
  | "tw"
  | "th"
  | "id";

export type EventStatus =
  | "not-registered"
  | "entered"
  | "elected"
  | "joined"
  | "declined"
  | "waiting";

export interface RegisteredEvent {
  id: string;
  country: CountryCode;
  status: EventStatus;
  title: string;
  date: string;
  time: string;
  organizer: string;
  place: string;
  url: string;
  lastSynced: number;
}

export interface AccountRecord {
  playerId: string;
  nickname: string;
  country: CountryCode;
}
