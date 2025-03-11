// User data provided in the init data
export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    allows_write_to_pm?: boolean;
    added_to_attachment_menu?: boolean;
    photo_url?: string;
  }
  
  // Chat data where the Mini App was launched
  export interface TelegramChat {
    id: number;
    type: 'private' | 'group' | 'supergroup' | 'channel';
    title?: string;
    username?: string;
    photo_url?: string;
  }
  
  // Data about the connected Telegram bot
  export interface BotInfo {
    id: number;
    name: string;
    username: string;
    photo_url?: string;
  }
  
  // Data about the chat's theme
  export interface ThemeParams {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  }
  
  // Start parameters (from deep linking)
  export interface StartParams {
    [key: string]: string;
  }
  
  // When a Mini App is opened from inline query result
  export interface InlineQueryInfo {
    id: string;
    query: string;
    offset: string;
  }
  
  // Full structure of Telegram Mini App initialization data
  export type TelegramInitData = {
    // Required fields
    query_id?: string;
    user?: TelegramUser;
    receiver?: TelegramUser;
    chat?: TelegramChat;
    chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
    chat_instance?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date: number;
    hash: string;
    
    // Optional fields
    bot?: BotInfo;
    theme_params?: ThemeParams;
    start_params?: StartParams;
    inline_query_info?: InlineQueryInfo;
  }
  
  // Parsed InitData class structure (mimicking the SDK's InitData class)
  export interface ParsedInitData {
    // Raw initialization data string
    raw(): string;
    
    // User who opened the Mini App
    user: TelegramUser | null;
    
    // Chat where the Mini App was opened (if applicable)
    chat: TelegramChat | null;
    
    // Chat type
    chatType: 'sender' | 'private' | 'group' | 'supergroup' | 'channel' | null;
    
    // Chat instance
    chatInstance: string | null;
    
    // Start parameter from deep link
    startParam: string | null;
    
    // Bot information
    bot: BotInfo | null;
    
    // Theme parameters
    themeParams: ThemeParams | null;
    
    // Start parameters
    startParams: StartParams | null;
    
    // Inline query information
    inlineQueryInfo: InlineQueryInfo | null;
    
    // Can send after timestamp
    canSendAfter: number | null;
    
    // Auth date (Unix timestamp)
    authDate: number;
  }