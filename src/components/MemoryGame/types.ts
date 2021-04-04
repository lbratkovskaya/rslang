export interface ICardProps {
  id?: string;
  value?: string;
  type: string;
  isOpen: boolean;
  disabled: boolean;
  audio: string;
  gameSize: number;
}

export interface IResultTableProps {
  isFail: boolean;
}
