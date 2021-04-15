<template>
	<view>
		<view class="logo"><image class="photo" src="../../../static/my/logo.png"></image></view>
		<view class="txt"><text v-html="html"></text></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			html: `快乐学堂是专为1—6年级学生研发的集课内学习辅导、百科知识、课外娱乐于一体的小学新课标同步学习网站。本着"教育为目的，游戏为载体"的出发点，以"服务学生为主体，服务家长、教师"为宗旨，贯穿"知识学习、技能训练、情感培养"发展主线，坚持"快乐学习，激发兴趣；持之以恒，形成习惯；成功体验，培养自信；手脑并用，提升能力"的教学理念，着力打造集"学生、家长、教师"三方互动于一体的网络学习平台。`
		};
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-bg-color;
}
.logo {
	height: 370upx;
	display: flex;

	.photo {
		margin: auto;
		width: 299upx;
		height: 168upx;
	}
}

.txt {
	padding: 0 28upx;
	text-indent: 2em;
	font-size: $uni-font-size-base;
	line-height: 64upx;
}
</style>
