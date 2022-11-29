<template>
	<div class="awesome-container layout-pd">
		<el-card shadow="hover" :header="`fontawesome 字体图标(自动载入)：${state.sheetsIconList.length - 24}个`">
			<el-row class="iconfont-row">
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(v, k) in state.sheetsIconList" :key="k">
					<div class="iconfont-warp">
						<div class="flex-margin">
							<div class="iconfont-warp-value">
								<i :class="v" class="fa"></i>
							</div>
							<div class="iconfont-warp-label mt10">{{ v }}</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="pagesAwesome">
import { reactive, onMounted } from 'vue';
import initIconfont from '/@/utils/getStyleSheets';

// 定义变量内容
const state = reactive({
	sheetsIconList: [],
});

// 初始化获取 css 样式，这里使用fontawesome的图标(记得加上前缀 `fa`)，其它第三方请自行做判断
const initGetStyleSheets = () => {
	initIconfont.awe().then((res: any) => (state.sheetsIconList = res));
};
// 页面加载时
onMounted(() => {
	initGetStyleSheets();
});
</script>

<style scoped lang="scss">
.awesome-container {
	.iconfont-row {
		border-top: 1px solid var(--next-border-color-light);
		border-left: 1px solid var(--next-border-color-light);
		.iconfont-warp {
			text-align: center;
			border-right: 1px solid var(--next-border-color-light);
			border-bottom: 1px solid var(--next-border-color-light);
			height: 120px;
			overflow: hidden;
			display: flex;
			transition: all 0.3s ease;
			&:hover {
				box-shadow: 0 2px 12px var(--next-color-dark-hover);
				cursor: pointer;
				transition: all 0.3s ease;
				.iconfont-warp-value {
					i {
						color: var(--el-color-primary);
						transition: all 0.3s ease;
					}
				}
				.iconfont-warp-label {
					color: var(--el-color-primary);
					transition: all 0.3s ease;
				}
			}
			.iconfont-warp-value {
				i {
					color: #606266;
					font-size: 32px;
					transition: all 0.3s ease;
				}
			}
			.iconfont-warp-label {
				color: #99a9bf;
				transition: all 0.3s ease;
			}
		}
	}
}
</style>
