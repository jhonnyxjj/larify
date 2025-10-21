export type ServiceStatus = {
  status: 'ok' | 'error';
  message: string;
};

export type Health = {
  status: 'ok' | 'error';
  timestamp: string;
  details: Record<string, ServiceStatus>;
};
 