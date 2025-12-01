export interface Channel {
  id: number;
  name: string;
  display_name: string;
  department_id: number | null;
  is_private: 'Y' | 'N';
  type: 'general' | 'announcement' | 'task' | 'meeting' | 'bot';
  slack_channel_id: string | null;
  is_active: 'Y' | 'N';
  created_at: string;
  department_name?: string;
  department_display_name?: string;
}

export type GroupedChannels = Record<number | '전체', Channel[]>;
