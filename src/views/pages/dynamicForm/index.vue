<template>
	<div class="dynamic-form-container">
		<el-card shadow="hover" header="动态复杂表单">
			<el-form :model="form" ref="formRulesOneRef" size="small" label-width="100px" class="mt35">
				<el-row :gutter="35">
					<el-col
						:xs="val.xs"
						:sm="val.sm"
						:md="val.md"
						:lg="val.md"
						:xl="val.xl"
						class="mb20"
						v-show="val.isShow"
						v-for="(val, key) in formData"
						:key="key"
					>
						<template v-if="val.type !== ''">
							<el-form-item
								:label="val.label"
								:prop="val.prop"
								:rules="[{ required: val.required, message: `${val.label}不能为空`, trigger: val.type === 'input' ? 'blur' : 'change' }]"
								v-if="val.type !== ''"
							>
								<el-input
									v-model="form[val.prop]"
									:placeholder="val.placeholder"
									clearable
									v-if="val.type === 'input'"
									style="width: 100%"
									:disabled="val.disabled"
								></el-input>
								<el-date-picker
									v-model="form[val.prop]"
									type="date"
									:placeholder="val.placeholder"
									v-else-if="val.type === 'date'"
									style="width: 100%"
									:disabled="val.disabled"
								>
								</el-date-picker>
								<el-select
									v-model="form[val.prop]"
									:placeholder="val.placeholder"
									v-else-if="val.type === 'select'"
									style="width: 100%"
									:disabled="val.disabled"
								>
									<el-option v-for="item in val.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								</el-select>
								<el-input
									type="textarea"
									v-model="form[val.prop]"
									:placeholder="val.placeholder"
									clearable
									v-if="val.type === 'textarea'"
									style="width: 100%"
									:disabled="val.disabled"
								></el-input>
							</el-form-item>
						</template>
						<template v-else>
							<el-row :gutter="35" v-for="(v, k) in form.list" :key="k">
								<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb20">
									<el-form-item label="年度" :prop="`list[${k}].year`" :rules="[{ required: true, message: `年度不能为空`, trigger: 'blur' }]">
										<template #label>
											<el-button type="primary" circle size="mini" @click="onAddRow" v-if="k === 0">
												<el-icon>
													<elementPlus />
												</el-icon>
											</el-button>
											<el-button type="danger" circle size="mini" @click="onDelRow(k)" v-else>
												<el-icon>
													<elementDelete />
												</el-icon>
											</el-button>
											<span class="ml10">年度</span>
										</template>
										<el-input v-model="form.list[k].year" style="width: 100%" placeholder="请输入"> </el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb20">
									<el-form-item label="月度" :prop="`list[${k}].month`" :rules="[{ required: true, message: `月度不能为空`, trigger: 'blur' }]">
										<el-input v-model="form.list[k].month" style="width: 100%" placeholder="请输入"> </el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="mb20">
									<el-form-item label="日度" :prop="`list[${k}].day`" :rules="[{ required: true, message: `日度不能为空`, trigger: 'blur' }]">
										<el-input v-model="form.list[k].day" style="width: 100%" placeholder="请输入"> </el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</template>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-row class="flex mt15">
			<div class="flex-margin">
				<el-button size="small" @click="onResetForm">
					<el-icon>
						<elementRefreshRight />
					</el-icon>
					重置表单
				</el-button>
				<el-button size="small" type="primary" @click="onSubmitForm">
					<SvgIcon name="iconfont icon-shuxing" />
					验证表单
				</el-button>
			</div>
		</el-row>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, getCurrentInstance } from 'vue';
import { formData } from './mock';
export default {
	name: 'pagesDynamicForm',
	setup() {
		const { proxy } = getCurrentInstance() as any;
		const state = reactive({
			formData,
			form: {
				name: '',
				email: '',
				autograph: '',
				occupation: '',
				list: [
					{
						year: '',
						month: '',
						day: '',
					},
				],
				remarks: '',
			},
		});
		// 新增行
		const onAddRow = () => {
			state.form.list.push({
				year: '',
				month: '',
				day: '',
			});
		};
		// 删除行
		const onDelRow = (k) => {
			state.form.list.splice(k, 1);
		};
		// 表单验证
		const onSubmitForm = () => {
			proxy.$refs.formRulesOneRef.validate((valid) => {
				if (valid) {
					proxy.$message.success('验证成功');
				} else {
					return false;
				}
			});
		};
		// 重置表单
		const onResetForm = () => {
			proxy.$refs.formRulesOneRef.resetFields();
		};
		// 页面加载时
		onMounted(() => {});
		return {
			onAddRow,
			onDelRow,
			onSubmitForm,
			onResetForm,
			...toRefs(state),
		};
	},
};
</script>
