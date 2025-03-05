export type MessageSeverity = 'info' | 'success' | 'error' | 'warning';

export type Message = {
  severity: MessageSeverity;
  text: string;
}
