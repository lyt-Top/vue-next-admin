<template>
	<div class="steps-container">
		<el-card shadow="hover" header="element-plus 步骤条">
			<el-steps :active="stepsActive">
				<el-step title="第一步">
					<template #icon>
						<SvgIcon name="iconfont icon-0_round_solid" :size="20" />
					</template>
				</el-step>
				<el-step title="第二步">
					<template #icon>
						<SvgIcon name="iconfont icon-2_round_solid" :size="20" />
					</template>
				</el-step>
				<el-step title="第三步">
					<template #icon>
						<SvgIcon name="iconfont icon-3_round_solid" :size="20" />
					</template>
				</el-step>
			</el-steps>
			<el-result icon="success" title="成功提示" subTitle="请根据提示进行操作" v-if="stepsActive === 1"> </el-result>
			<el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作" v-else-if="stepsActive === 2"> </el-result>
			<el-result icon="error" title="错误提示" subTitle="请根据提示进行操作" v-else-if="stepsActive === 3"> </el-result>
			<el-button @click="onNextSteps" size="default" class="mt15" type="primary">
				<SvgIcon name="iconfont icon-step" />
				下一步
			</el-button>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue';

export default defineComponent({
	name: 'pagesSteps',
	setup() {
		const state = reactive({
			stepsActive: 1,
		});
		// 下一步点击
		const onNextSteps = () => {
			if (state.stepsActive++ > 2) state.stepsActive = 1;
		};
		return {
			onNextSteps,
			...toRefs(state),
		};
	},
});
</script>
