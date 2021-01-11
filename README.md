# React-Blog-Version1.0

[DEMO 連結](https://rickylee23.github.io/React-Blog/)


基本功能：

- 首頁可觀看全部文章
- 文章讀取中則進入 loading 畫面
- 具註冊、登入機制 ; 如未成功登入則顯示錯誤訊息，密碼皆為 Lidemy
- 具 token 機制，把 token 儲存於 localstorage
- 具備切換分頁功能
- 登入後可發表文章

待完成：

- 外觀優化
- 加入發文者資訊、文章 id

使用技術：

- 使用 React-Router 建立 SPA
- 使用 useState 管理狀態
- 使用 createContext、useContext 由上層往下層傳遞 Token
- 串接 API，取得部落格資訊，包含文章標題、發表時間等資訊
- 使用 styled component 管理 css 外觀
- 使用 function component 區分各頁面為不同模組
