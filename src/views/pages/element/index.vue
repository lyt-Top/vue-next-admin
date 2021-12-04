<template>
	<div class="element-container">
		<el-card shadow="hover" :header="`element plus 字体图标(自动载入，增加了 element 前缀，使用时：elementAim)：${sheetsIconList.length}个`">
			<el-row class="iconfont-row">
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(v, k) in sheetsIconList" :key="k">
					<div class="iconfont-warp">
						<div class="flex-margin">
							<div class="iconfont-warp-value">
								<SvgIcon :name="v" />
							</div>
							<div class="iconfont-warp-label mt10">{{ v }}</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted } from 'vue';
import initIconfont from '/@/utils/getStyleSheets';
export default {
	name: 'pagesElement',
	setup() {
		const state = reactive({
			sheetsIconList: [],
		});
		// 初始化获取 css 样式，获取 element plus 自带 svg 图标，增加了 element 前缀，使用时：elementAim
		const initGetStyleSheets = () => {
			initIconfont.ele().then((res: any) => {
				state.sheetsIconList = res;
			});
		};
		// 页面加载时
		onMounted(() => {
			initGetStyleSheets();
		});
		return {
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.element-container {
	.iconfont-row {
		border-top: 1px solid #ebeef5;
		border-left: 1px solid #ebeef5;
		.iconfont-warp {
			text-align: center;
			border-right: 1px solid #ebeef5;
			border-bottom: 1px solid #ebeef5;
			height: 120px;
			overflow: hidden;
			display: flex;
			transition: all 0.3s ease;
			&:hover {
				box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
				cursor: pointer;
				transition: all 0.3s ease;
				.iconfont-warp-value {
					i {
						color: var(--color-primary);
						transition: all 0.3s ease;
					}
				}
				.iconfont-warp-label {
					color: var(--color-primary);
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
