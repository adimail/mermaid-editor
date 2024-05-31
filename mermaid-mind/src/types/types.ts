import { Session } from "next-auth";

export interface Project {
  _id: string;
  userID: string;
  userName: string;
  userProfile: string;
  title: string;
  description: string;
  code: string;
  config: string;
  public: boolean;
  anonymous: boolean;
  created: string;
}

export type DiagramHtml = Record<string, string>;

export interface SessionProps {
  session: Session | null;
}
