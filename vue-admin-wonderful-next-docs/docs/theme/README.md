---
sidebar: auto
---
# 主题设置

## 目录结构
#### `src/theme` 下，后期继续补充，样式都会写在这个文件夹下：

```ts
├── theme
	├── common
	│	├── transition.scss (页面过渡动画)
	│	└── var.scss (全局主题样式，用于全局改变样式)
	│
	├── mixins
	│	├── element-mixins.scss (定义重置的element plus混入复用样式)
	│	├── function.scs (全局主题颜色调用混入函数)
	│	└── mixins.scss (定义一些常用的全局混入样式)
	│
	├── app.scss (页面主样式，用于重置浏览器默认样式)
	├── base.scss (基础样式、过渡动画等)
	├── element.scss (重置的element plus样式，用于改变主题)
	├── index.scss (页面样式出口)
	└── media.scss (手机适配样式)
```


## scss 部分函数说明
#### 1、scss @mixin
[scss官方中文文档](https://www.sass.hk/docs/)，具体请查阅官方文档。使用方法：

- 1.1 定义

```scss
/* Button 按钮
------------------------------- */
@mixin Button($main, $c1, $c2) {
  color: set-color($main);
  background: set-color($c1);
  border-color: set-color($c2);
}
```

- 1.2 页面中使用，先引入，然后在 `css` 类中通过 `@include` 使用

```scss
@import 'mixins/element-mixins.scss';

// default
.el-button--default:hover,
.el-button--default:focus {
  @include Button(primary, primary-light-8, primary-light-6);
}
```

#### 2、scss @function

- 2.1 定义函数

```scss
/* 颜色调用函数
------------------------------- */
@function set-color($key) {
  @return var(--color-#{$key});
}
```

- 2.2 不理解？请看这个 `css3 :root` [CSS var() 函数](https://www.runoob.com/cssref/func-var.html)

```scss
/* 定义一个名为 "--main-bg-color" 的属性，然后使用 var() 函数调用该属性： */
:root {
  --main-bg-color: red;
}
 
#div1 {
  background-color: var(--main-bg-color);
}
 
#div2 {
  background-color: var(--main-bg-color);
}
```

#### 3、为什么不使用这种写法放进 :root 中？

```scss
$colors: (
	primary: #409eff,
	success: #67c23a,
	info: #909399,
	warning: #e6a23c,
	danger: #f56c6c
)

:root {
	@each $key, $value in $colors {
		--color-#{$key}: #{$value};
	}
}
```

- 因为 scss 不支持这种嵌套 `mix(var(--color-primary), var(--color-success), 10%)`，lighten / darken / saturate / desaturate 等，从而无法用 
- 从而无法用 `document.documentElement.style.setProperty('--color-primary', 'blue');` 改变样式


## 具体实现自定义全局主题

实现方法，以下方法不晓得会不会影响页面渲染性能：

- 1、定义全局 :root 初始变量，路径：`src/theme/common/var.scss`
- 2、编写覆盖 element plus 的样式：路径：`src/theme/element.scss`
- 3、页面通过 `document.documentElement.style.setProperty` 方法改变 `:root` 中的值

::: tip 提示
第一第二步就不介绍了，直接去路径去看就懂了。接下来我们讲讲第三步：
:::

#### 1、通过 `document.documentElement.style.setProperty` 改变颜色值 [setProperty 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)

```ts
// setup 中
import { reactive, toRefs } from "vue"

export defalut {
	setup() {
		const state = reactive({
			color: ''
		})
		function colorChange() {
			// 设置颜色
			document.documentElement.style.setProperty(
				"--color-primary",
				state.color
			)
			// 设置颜色变浅
			document.documentElement.style.setProperty(
				"--color-primary-light-1",
				getLightColor(state.color1, 0.1)
			)
		}
		return {
			colorChange,
			...toRefs(state)
		}
	}
}
```

#### 2、getLightColor 颜色变浅方法

路径在：`src/utils/theme.ts`

```ts
// 变浅颜色值，level为加深的程度，限0-1之间
export function getLightColor(color: any, level: number) {
    let reg = /^\#?[0-9A-F]{6}$/;
    if (!reg.test(color)) return ElMessage({type:'warning',message:"输入错误的hex颜色值"});
    let rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
```

#### 3、到此就完成了主题的全局变色了

::: tip 还有疑问？
总的来说，就是通过重新定义 `css` 样式，用来覆盖 [element-plus](https://element-plus.gitee.io/#/zh-CN/component/changelog) 默认的样式，从而实现全局主题变色。
:::

## 其它方法实现全局主题

- 参考 `花裤衩大佬`：[手摸手，带你用vue撸后台 系列三(实战篇)](https://segmentfault.com/a/1190000009762198#articleHeader2)
- vue-element-admin：[https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)


