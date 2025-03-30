export let url:string;
if (process.env.IS_PRODUCTION=="False") {
  url = "http://localhost:8000/"
} else {
  url = process.env.BACKEND_URL || "http://localhost:8000/"
}

export type error = {
  status:number,
  message:string
}
console.log(url)
export interface ITelegramUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}
export type answer = {
  answer:string,
  isCorrect:boolean
}
  export interface IWebApp extends Window {
    initData: string;
    initDataUnsafe: {
      query_id: string;
      user: ITelegramUser;
      auth_date: string;
      hash: string;
    };
    version: string;
    platform: string;
    colorScheme: string;
    themeParams: {
      link_color: string;
      button_color: string;
      button_text_color: string;
      secondary_bg_color: string;
      hint_color: string;
      bg_color: string;
      text_color: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    isClosingConfirmationEnabled: boolean;
    headerColor: string;
    backgroundColor: string;
    BackButton: {
      isVisible: boolean;
    };
    MainButton: {
      text: string;
      color: string;
      textColor: string;
      isVisible: boolean;
      isProgressVisible: boolean;
      isActive: boolean;
    };
    HapticFeedback: any;
  }