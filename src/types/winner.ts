export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export type WinnerData = Omit<Winner, 'id'>;