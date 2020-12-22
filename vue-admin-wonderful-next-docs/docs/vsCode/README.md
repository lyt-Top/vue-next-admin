---
sidebar: auto
---
# visualstudio

[官网：https://code.visualstudio.com/](https://code.visualstudio.com/)

## 首选项 - 设置 - settings.json

```json
{
  // 使用单引号替代双引号
  "prettier.singleQuote": true,
  // 这个按用户自身习惯选择
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_line_length": 120,
      "wrap_attributes": "auto",
      "end_with_newline": false
    }
  },
  "workbench.iconTheme": "material-icon-theme",
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "backgroundCover.imagePath": "c:\\Users\\Administrator\\Desktop\\文档\\2023154.jpg",
  "search.followSymlinks": false,
  "backgroundCover.opacity": 0.5,
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe"
}
```

## vsCode 插件
1. Auto Close Tag
1. Auto Rename Tag
1. background-cover
1. Bracket Pair Colorizer
1. Chinese (Simplified) Language Pack for Visual Studio Code
1. Color Info
1. Community Material Theme
1. Debugger for Chrome
1. filesize
1. GitLens — Git supercharged
1. HTML Boilerplate
1. HTML CSS Support
1. HTML Snippets
1. HTMLHint
1. Icon Fonts
1. JavaScript (ES6) code snippets
1. markdown-formatter
1. Material Icon Theme
1. Material Theme
1. Material Theme Icons
1. open in browser
1. Path Intellisense
1. Prettier - Code formatter
1. Vetur

## 图文步骤

#### 1、打开设置
<p></p><img src="https://gitee.com/lyt-top/vue-admin-wonderful-images/raw/master/doc/vs-code1.png"/>
<p></p><img src="https://gitee.com/lyt-top/vue-admin-wonderful-images/raw/master/doc/vs-code2.png"/>

#### 2、安装插件
<p></p><img src="https://gitee.com/lyt-top/vue-admin-wonderful-images/raw/master/doc/vs-code3.png"/>