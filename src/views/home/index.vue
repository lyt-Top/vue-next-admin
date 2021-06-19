<template>
	<div class="home">
		<!-- 用户信息 -->
		<el-row :gutter="15">
			<el-col :md="24" :lg="16" :xl="16" class="mb15">
				<el-card shadow="hover">
					<div slot="header">
						<span>{{ $t('message.card.title1') }}</span>
					</div>
					<div class="user-item">
						<div class="user-item-left">
							<img :src="getUserInfos.photo" />
						</div>
						<div class="user-item-right overflow">
							<el-row>
								<el-col :span="24" class="right-title mb15 one-text-overflow"
									>{{ currentTime }}，{{ getUserInfos.userName }}，{{ dailyMessage }}
								</el-col>
								<el-col :span="24">
									<el-col :xs="12" :sm="12" :md="8" class="right-l-v">
										<div class="right-label">昵称：</div>
										<div class="right-value">小柒</div>
									</el-col>
									<el-col :xs="12" :sm="12" :md="16" class="right-l-v">
										<div class="right-label">身份：</div>
										<div class="right-value">{{ userInfo.userName === 'admin' ? '超级管理' : '普通用户' }}</div>
									</el-col>
								</el-col>
								<el-col :span="24" class="mt5">
									<el-col :xs="12" :sm="12" :md="8" class="right-l-v">
										<div class="right-label one-text-overflow">IP：</div>
										<div class="right-value one-text-overflow">192.168.1.1</div>
									</el-col>
									<el-col :xs="12" :sm="12" :md="16" class="right-l-v">
										<div class="right-label one-text-overflow">时间：</div>
										<div class="right-value one-text-overflow">{{ userInfo.time }}</div>
									</el-col>
								</el-col>
								<el-col :span="24" class="mt15">
									<el-button size="small" icon="el-icon-edit-outline">修改信息 </el-button>
									<el-button size="small" icon="el-icon-position" type="primary">发布活动</el-button>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :md="24" :lg="8" :xl="8" class="mb15">
				<el-card shadow="hover">
					<div slot="header">
						<span>{{ $t('message.card.title2') }}</span>
						<el-button class="home-card-more" type="text" @click="onOpenGitee">{{ $t('message.card.title3') }}</el-button>
					</div>
					<div class="info">
						<Scroll :data="newsInfoList" class="info-scroll" :class-option="optionSingleHeight">
							<ul class="info-ul">
								<li v-for="(v, k) in newsInfoList" :key="k" class="info-item" @click="onNewsInfoListClick(v)">
									<div class="info-item-left" v-text="v.title"></div>
									<div class="info-item-right" v-text="v.date"></div>
								</li>
							</ul>
						</Scroll>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 推荐 -->
		<el-card shadow="hover">
			<div slot="header">
				<span>{{ $t('message.card.title4') }}</span>
				<el-button class="home-card-more" type="text" @click="onOpenGitee">{{ $t('message.card.title5') }}</el-button>
			</div>
			<el-row :gutter="15" class="home-recommend-row">
				<el-col :sm="24" :md="12" :lg="6" :xl="6" v-for="(v, k) in recommendList" :key="k">
					<div class="home-recommend" :style="{ 'background-color': v.bg }">
						<i :class="v.icon" :style="{ color: v.iconColor }"></i>
						<div class="home-recommend-auto">
							<div>{{ v.title }}</div>
							<div class="home-recommend-msg">{{ v.msg }}</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>

		<!-- charts -->
		<el-row :gutter="15" class="mt15">
			<el-col :md="24" :lg="8" :xl="8" class="mb15">
				<el-card shadow="hover">
					<div slot="header">
						<span>{{ $t('message.card.title6') }}</span>
					</div>
					<div class="charts">
						<div class="charts-right">
							<div ref="homeStockRef" class="h100"></div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :md="24" :lg="16" :xl="16" class="mb15">
				<el-card shadow="hover">
					<div slot="header">
						<span>{{ $t('message.card.title7') }}</span>
					</div>
					<div class="charts">
						<div class="charts-left mr7">
							<div ref="homeLaboratoryRef" class="h100"></div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- v-charts -->
		<el-row :gutter="15">
			<el-col :md="24" :lg="16" :xl="16" class="home-lg">
				<el-card shadow="hover">
					<div slot="header">
						<span>{{ $t('message.card.title8') }}</span>
					</div>
					<div class="charts">
						<div class="charts-left mr7">
							<div ref="homeOvertimeRef" class="h100"></div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :md="24" :lg="8" :xl="8">
				<el-card shadow="hover">
					<div slot="header">
						<span>{{ $t('message.card.title9') }}</span>
					</div>
					<div class="home-charts">
						<div class="home-charts-item" v-for="(v, k) in chartsRightList" :key="k">
							<div class="home-charts-item-left">
								<div class="home-charts-item-title">{{ v.title }}</div>
								<div class="home-charts-item-num" :style="{ color: v.color }" :id="`titleNum${k + 1}`"></div>
							</div>
							<div class="home-charts-item-right">
								<i :class="v.icon" :style="{ 'background-color': v.iconBg, color: v.color }"></i>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import Scroll from 'vue-seamless-scroll';
import { CountUp } from 'countup.js';
import { Session } from '@/utils/storage';
import { formatAxis, formatDate } from '@/utils/formatTime';
import { recommendList, chartsRightList, newsInfoList, dailyMessage } from './mock';
export default {
	name: 'home',
	components: { Scroll },
	data() {
		return {
			recommendList,
			chartsRightList,
			newsInfoList,
			userInfo: {},
			dailyMessage: {},
		};
	},
	created() {
		this.initUserInfo();
		this.initDailyMessage();
	},
	computed: {
		currentTime() {
			return formatAxis(new Date());
		},
		optionSingleHeight() {
			return {
				singleHeight: 28,
				limitMoveNum: 8,
				waitTime: 2000,
			};
		},
		getUserInfos() {
			return this.$store.state.userInfos.userInfos;
		},
	},
	mounted() {
		this.initHomeStock();
		this.initHomeLaboratory();
		this.initHomeOvertime();
		this.initNumCountUp();
	},
	methods: {
		// 初始化数字滚动
		initNumCountUp() {
			this.$nextTick(() => {
				new CountUp('titleNum1', Math.random() * 100000).start();
				new CountUp('titleNum2', Math.random() * 100000).start();
				new CountUp('titleNum3', Math.random() * 100000).start();
			});
		},
		// 库存作业
		initHomeStock() {
			const myChart = echarts.init(this.$refs.homeStockRef);
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'item',
				},
				legend: {
					left: 'center',
				},
				series: [
					{
						name: '邮件营销',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2,
						},
						data: [
							{ value: 580, name: '邮件营销' },
							{ value: 300, name: '视频广告' },
							{ value: 230, name: '联盟广告' },
						],
						top: 30,
					},
				],
			};
			myChart.setOption(option);
			window.addEventListener('resize', () => {
				myChart.resize();
			});
		},
		// 履约情况
		initHomeLaboratory() {
			const myChart = echarts.init(this.$refs.homeLaboratoryRef);
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['预购队列', '最新成交价'],
					right: 13,
				},
				xAxis: {
					data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
				},
				yAxis: [
					{
						type: 'value',
						name: '价格',
					},
				],
				series: [
					{
						name: '预购队列',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20],
					},
					{
						name: '最新成交价',
						type: 'line',
						data: [15, 20, 16, 20, 30, 8],
					},
				],
			};
			myChart.setOption(option);
			window.addEventListener('resize', () => {
				myChart.resize();
			});
		},
		// 缺货监控
		initHomeOvertime() {
			const myChart = echarts.init(this.$refs.homeOvertimeRef);
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['订单数量', '超时数量', '在线数量', '预警数量'],
					right: 13,
				},
				xAxis: {
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				},
				yAxis: [
					{
						type: 'value',
						name: '数量',
					},
				],
				series: [
					{
						name: '订单数量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20, 11, 13, 10, 9, 17, 19],
					},
					{
						name: '超时数量',
						type: 'bar',
						data: [15, 12, 26, 15, 11, 16, 31, 13, 5, 16, 13, 15],
					},
					{
						name: '在线数量',
						type: 'line',
						data: [15, 20, 16, 20, 30, 8, 16, 19, 12, 18, 19, 14],
					},
					{
						name: '预警数量',
						type: 'line',
						data: [10, 10, 13, 12, 15, 18, 19, 10, 12, 15, 11, 17],
					},
				],
			};
			myChart.setOption(option);
			window.addEventListener('resize', () => {
				myChart.resize();
			});
		},
		// 随机语录
		initDailyMessage() {
			this.dailyMessage = dailyMessage[Math.floor(Math.random() * dailyMessage.length)];
		},
		// 初始化登录信息
		initUserInfo() {
			if (!Session.get('userInfo')) return false;
			this.userInfo = Session.get('userInfo');
			this.userInfo.time = formatDate(new Date(this.userInfo.time), 'YYYY-mm-dd HH:MM:SS');
		},
		// 消息通知当前项点击
		onNewsInfoListClick(v) {
			window.open(v.link);
		},
		// 跳转到 gitee
		onOpenGitee() {
			window.open('https://gitee.com/lyt-top/vue-next-admin');
		},
	},
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
