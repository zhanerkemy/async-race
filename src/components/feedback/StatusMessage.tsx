interface StatusMessageProps {
  children: string;
  role?: 'status' | 'alert';
}

export function StatusMessage({ children, role = 'status' }: StatusMessageProps) {
  return <p role={role}>{children}</p>;
}