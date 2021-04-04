export interface IModalProps {
  open: boolean;
  handleClose: () => void;
  text?: string;
  table?: {};
  isText: boolean;
}
