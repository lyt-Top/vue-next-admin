<template>
	<div class="layout-pd">
		<el-card shadow="hover" header="数字滚动演示">
			<el-alert
				title="感谢优秀的 `countup.js`，项目地址：https://github.com/inorganik/countUp.js"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<el-row :gutter="20">
				<el-col :sm="6" class="mb15" v-for="(v, k) in state.topCardItemList" :key="k">
					<div class="countup-card-item countup-card-item-box" :style="{ background: `var(${v.color})` }">
						<div class="countup-card-item-flex" ref="topCardItemRefs">
							<div class="countup-card-item-title pb3">{{ v.title }}</div>
							<div class="countup-card-item-title-num pb6"></div>
							<div class="countup-card-item-tip pb3">{{ v.tip }}</div>
							<div class="countup-card-item-tip-num"></div>
						</div>
						<i :class="v.icon" :style="{ color: v.iconColor }"></i>
					</div>
				</el-col>
			</el-row>
			<div class="flex-warp">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="default" @click="refreshCurrent">
							<el-icon>
								<ele-RefreshRight />
							</el-icon>
							重置/刷新数值
						</el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="funCountup">
import { reactive, onMounted, nextTick, ref } from 'vue';
import { CountUp } from 'countup.js';

// 定义变量内容
const topCardItemRefs = ref<RefType[]>([]);
const state = reactive({
	topCardItemList: [
		{
			title: '今日访问人数',
			titleNum: '123',
			tip: '在场人数',
			tipNum: '911',
			color: '--el-color-primary',
			iconColor: '#ffcb47',
			icon: 'iconfont icon-jinridaiban',
		},
		{
			title: '实验室总数',
			titleNum: '123',
			tip: '使用中',
			tipNum: '611',
			color: '--el-color-success',
			iconColor: '#70cf41',
			icon: 'iconfont icon-AIshiyanshi',
		},
		{
			title: '申请人数（月）',
			titleNum: '123',
			tip: '通过人数',
			tipNum: '911',
			color: '--el-color-warning',
			iconColor: '#dfae64',
			icon: 'iconfont icon-shenqingkaiban',
		},
		{
			title: '销售情况',
			titleNum: '123',
			tip: '销售数',
			tipNum: '911',
			color: '--el-color-danger',
			iconColor: '#e56565',
			icon: 'iconfont icon-ditu',
		},
	],
});

// 初始化数字滚动
const initNumCountUp = () => {
	nextTick(() => {
		topCardItemRefs.value.forEach((v: HTMLDivElement) => {
			new CountUp(v.querySelector('.countup-card-item-title-num') as HTMLDivElement, Math.random() * 10000).start();
			new CountUp(v.querySelector('.countup-card-item-tip-num') as HTMLDivElement, Math.random() * 1000).start();
		});
	});
};
// 重置/刷新数值
const refreshCurrent = () => {
	initNumCountUp();
};
// 页面加载时
onMounted(() => {
	initNumCountUp();
});
</script>

<style scoped lang="scss">
.countup-card-item {
	width: 100%;
	height: 103px;
	background: var(--el-text-color-secondary);
	border-radius: 4px;
	transition: all ease 0.3s;
	&:hover {
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		transition: all ease 0.3s;
	}
}
.countup-card-item-box {
	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;
	&:hover {
		i {
			right: 0px !important;
			bottom: 0px !important;
			transition: all ease 0.3s;
		}
	}
	i {
		position: absolute;
		right: -10px;
		bottom: -10px;
		font-size: 70px;
		transform: rotate(-30deg);
		transition: all ease 0.3s;
	}
	.countup-card-item-flex {
		padding: 0 20px;
		color: var(--el-color-white);
		.countup-card-item-title,
		.countup-card-item-tip {
			font-size: 13px;
		}
		.countup-card-item-title-num {
			font-size: 18px;
		}
		.countup-card-item-tip-num {
			font-size: 13px;
		}
	}
}
</style>
