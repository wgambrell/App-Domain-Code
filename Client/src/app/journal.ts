import { JournalAccount } from './journalAccount';

export class Journal {
  JId: number;
  Date: Date;
  Description: string;
  Reference: string;
  CreatedBy: string;
  Type: string;
  FileID: number;
  FileName: string;
  JournalAccounts: JournalAccount[];
  acceptance: string;
}
