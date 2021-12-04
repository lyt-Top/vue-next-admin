<template>
	<div>
		<el-card shadow="hover" header="数字滚动演示">
			<el-alert
				title="感谢优秀的 `countup.js`，项目地址：https://github.com/inorganik/countUp.js"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<el-row :gutter="20">
				<el-col :sm="6" class="mb15" v-for="(v, k) in topCardItemList" :key="k">
					<div class="countup-card-item countup-card-item-box" :style="{ background: v.color }">
						<div class="countup-card-item-flex">
							<div class="countup-card-item-title pb3">{{ v.title }}</div>
							<div class="countup-card-item-title-num pb6" :id="`titleNum${k + 1}`"></div>
							<div class="countup-card-item-tip pb3">{{ v.tip }}</div>
							<div class="countup-card-item-tip-num" :id="`tipNum${k + 1}`"></div>
						</div>
						<i :class="v.icon" :style="{ color: v.iconColor }"></i>
					</div>
				</el-col>
			</el-row>
			<div class="flex-warp">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="small" @click="refreshCurrent">
							<el-icon>
								<elementRefreshRight />
							</el-icon>
							重置/刷新数值
						</el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, nextTick } from 'vue';
import { CountUp } from 'countup.js';
export default {
	name: 'funCountup',
	setup() {
		const state = reactive({
			topCardItemList: [
				{
					title: '今日访问人数',
					titleNum: '123',
					tip: '在场人数',
					tipNum: '911',
					color: '#F95959',
					iconColor: '#F86C6B',
					icon: 'iconfont icon-jinridaiban',
				},
				{
					title: '实验室总数',
					titleNum: '123',
					tip: '使用中',
					tipNum: '611',
					color: '#8595F4',
					iconColor: '#92A1F4',
					icon: 'iconfont icon-AIshiyanshi',
				},
				{
					title: '申请人数（月）',
					titleNum: '123',
					tip: '通过人数',
					tipNum: '911',
					color: '#FEBB50',
					iconColor: '#FDC566',
					icon: 'iconfont icon-shenqingkaiban',
				},
				{
					title: '销售情况',
					titleNum: '123',
					tip: '销售数',
					tipNum: '911',
					color: '#41b3c5',
					iconColor: '#1dbcd5',
					icon: 'el-icon-trophy-1',
				},
			],
		});
		// 初始化数字滚动
		const initNumCountUp = () => {
			nextTick(() => {
				new CountUp('titleNum1', Math.random() * 10000).start();
				new CountUp('titleNum2', Math.random() * 10000).start();
				new CountUp('titleNum3', Math.random() * 10000).start();
				new CountUp('titleNum4', Math.random() * 10000).start();
				new CountUp('tipNum1', Math.random() * 1000).start();
				new CountUp('tipNum2', Math.random() * 1000).start();
				new CountUp('tipNum3', Math.random() * 1000).start();
				new CountUp('tipNum4', Math.random() * 1000).start();
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
		return {
			refreshCurrent,
			...toRefs(state),
		};
	},
};
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
		color: var(--color-whites);
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
