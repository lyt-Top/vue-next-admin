<template>
	<div class="layout-pd">
		<LimitsFrontEndPage style="padding: 0 !important" />
		<!-- 演示1：组件方式 -->
		<el-card shadow="hover" header="演示1：组件方式" class="mt15">
			<el-row class="mb10" style="color: #808080">单个权限验证（:value="xxx"）：</el-row>
			<div class="flex-warp">
				<Auth :value="'btn.add'">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="primary" size="default">
								<el-icon>
									<ele-DocumentAdd />
								</el-icon>
								新增
							</el-button>
						</div>
					</div>
				</Auth>
				<Auth :value="'btn.edit'">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="info" size="default">
								<el-icon>
									<ele-Edit />
								</el-icon>
								编辑
							</el-button>
						</div>
					</div>
				</Auth>
				<Auth :value="'btn.del'">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="danger" size="default">
								<el-icon>
									<ele-Delete />
								</el-icon>
								删除
							</el-button>
						</div>
					</div>
				</Auth>
				<Auth :value="'btn.link'">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="success" size="default">
								<el-icon>
									<ele-Link />
								</el-icon>
								跳转
							</el-button>
						</div>
					</div>
				</Auth>
			</div>

			<el-row class="mb10 mt10" style="color: #808080">多个权限验证，满足一个则显示（:value="[xxx,xxx]"）：</el-row>
			<div class="flex-warp">
				<Auths :value="['btn.addsss', 'btn.edit', 'btn.delsss', 'btn.linksss']">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="primary" size="default">
								<el-icon>
									<ele-DocumentAdd />
								</el-icon>
								新增
							</el-button>
						</div>
					</div>
				</Auths>
				<Auths :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="info" size="default">
								<el-icon>
									<ele-Edit />
								</el-icon>
								编辑
							</el-button>
						</div>
					</div>
				</Auths>
				<Auths :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="danger" size="default">
								<el-icon>
									<ele-Delete />
								</el-icon>
								删除
							</el-button>
						</div>
					</div>
				</Auths>
				<Auths :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="success" size="default">
								<el-icon>
									<ele-Link />
								</el-icon>
								跳转
							</el-button>
						</div>
					</div>
				</Auths>
			</div>

			<el-row class="mb10 mt10" style="color: #808080">多个权限验证，全部满足则显示（:value="[xxx,xxx]"）：</el-row>
			<div class="flex-warp">
				<AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="primary" size="default">
								<el-icon>
									<ele-DocumentAdd />
								</el-icon>
								新增
							</el-button>
						</div>
					</div>
				</AuthAll>
				<AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="info" size="default">
								<el-icon>
									<ele-Edit />
								</el-icon>
								编辑
							</el-button>
						</div>
					</div>
				</AuthAll>
				<AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="danger" size="default">
								<el-icon>
									<ele-Delete />
								</el-icon>
								删除
							</el-button>
						</div>
					</div>
				</AuthAll>
				<AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item">
						<div class="flex-warp-item-box">
							<el-button type="success" size="default">
								<el-icon>
									<ele-Link />
								</el-icon>
								跳转
							</el-button>
						</div>
					</div>
				</AuthAll>
			</div>
		</el-card>

		<!-- 演示2：指令方式 -->
		<el-card shadow="hover" header="演示2：指令方式（页面初始化时执行）" class="mt15">
			<el-row class="mb10" style="color: #808080">单个权限验证（v-auth="xxx"）：</el-row>
			<div class="flex-warp">
				<div class="flex-warp-item" v-auth="'btn.add'">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="default">
							<el-icon>
								<ele-DocumentAdd />
							</el-icon>
							新增
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auth="'btn.edit'">
					<div class="flex-warp-item-box">
						<el-button type="info" size="default">
							<el-icon>
								<ele-Edit />
							</el-icon>
							编辑
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auth="'btn.del'">
					<div class="flex-warp-item-box">
						<el-button type="danger" size="default">
							<el-icon>
								<ele-Delete />
							</el-icon>
							删除
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auth="'btn.link'">
					<div class="flex-warp-item-box">
						<el-button type="success" size="default">
							<el-icon>
								<ele-Link />
							</el-icon>
							跳转
						</el-button>
					</div>
				</div>
			</div>

			<el-row class="mb10 mt10" style="color: #808080">多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）：</el-row>
			<div class="flex-warp">
				<div class="flex-warp-item" v-auths="['btn.addsss', 'btn.edit', 'btn.delsss', 'btn.linksss']">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="default">
							<el-icon>
								<ele-DocumentAdd />
							</el-icon>
							新增
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item-box">
						<el-button type="info" size="default">
							<el-icon>
								<ele-Edit />
							</el-icon>
							编辑
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item-box">
						<el-button type="danger" size="default">
							<el-icon>
								<ele-Delete />
							</el-icon>
							删除
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item-box">
						<el-button type="success" size="default">
							<el-icon>
								<ele-Link />
							</el-icon>
							跳转
						</el-button>
					</div>
				</div>
			</div>

			<el-row class="mb10 mt10" style="color: #808080">多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）：</el-row>
			<div class="flex-warp">
				<div class="flex-warp-item" v-auth-all="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="default">
							<el-icon>
								<ele-DocumentAdd />
							</el-icon>
							新增
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auth-all="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item-box">
						<el-button type="info" size="default">
							<el-icon>
								<ele-Edit />
							</el-icon>
							编辑
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auth-all="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item-box">
						<el-button type="danger" size="default">
							<el-icon>
								<ele-Delete />
							</el-icon>
							删除
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item" v-auth-all="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
					<div class="flex-warp-item-box">
						<el-button type="success" size="default">
							<el-icon>
								<ele-Link />
							</el-icon>
							跳转
						</el-button>
					</div>
				</div>
			</div>
		</el-card>

		<!-- 演示3：函数方式 -->
		<el-card shadow="hover" header="演示3：函数方式（点击按钮查看有无权限，用于判断）" class="mt15">
			<el-row class="mb10" style="color: #808080">auth('xxx')、auths(['xxx','xxx'])、authAll(['xxx','xxx'])：</el-row>
			<div class="flex-warp">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="default" @click="onAuthClick">
							<el-icon>
								<ele-DocumentAdd />
							</el-icon>
							新增
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="info" size="default" @click="onAuthsClick">
							<el-icon>
								<ele-Edit />
							</el-icon>
							编辑
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="danger" size="default" @click="onAuthAllClick">
							<el-icon>
								<ele-Delete />
							</el-icon>
							删除
						</el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="limitsFrontEndBtn">
import { defineAsyncComponent } from 'vue';
import { ElMessage } from 'element-plus';
import { auth, auths, authAll } from '/@/utils/authFunction';

// 引入组件
const LimitsFrontEndPage = defineAsyncComponent(() => import('/@/views/limits/frontEnd/page/index.vue'));
const Auth = defineAsyncComponent(() => import('/@/components/auth/auth.vue'));
const Auths = defineAsyncComponent(() => import('/@/components/auth/auths.vue'));
const AuthAll = defineAsyncComponent(() => import('/@/components/auth/authAll.vue'));

// 单个权限验证
const onAuthClick = () => {
	if (!auth('btn.add')) ElMessage.error('抱歉，您没有权限！');
	else ElMessage.success('恭喜，您有权限！');
};
// 多个权限验证，满足一个则为 true
const onAuthsClick = () => {
	if (!auths(['btn.add', 'btn.edit', 'btn.del', 'btn.link'])) ElMessage.error('抱歉，您没有权限！');
	else ElMessage.success('恭喜，您有权限！');
};
// 多个权限验证，全部满足则为 true
const onAuthAllClick = () => {
	if (!authAll(['btn.add', 'btn.edit', 'btn.del', 'btn.link'])) ElMessage.error('抱歉，您没有权限！');
	else ElMessage.success('恭喜，您有权限！');
};
</script>

<style scoped lang="scss">
.flex-warp {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	margin: 0 -5px;
	.flex-warp-item {
		padding: 5px;
		.flex-warp-item-box {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
