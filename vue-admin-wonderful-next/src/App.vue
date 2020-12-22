<template>
  <div id="main-warp">
    <img src="/@/assets/logo-web-element.svg" />
    <div style="display:flex;">
      <span style="display:flex;align-items: center;">primary:<el-color-picker v-model="color1" @change="colorChange1">
        </el-color-picker></span>
      <span style="display:flex;align-items: center;margin-left:15px;">success:<el-color-picker v-model="color2"
          @change="colorChange2">
        </el-color-picker></span>
      <span style="display:flex;align-items: center;margin-left:15px;">info:<el-color-picker v-model="color3"
          @change="colorChange3">
        </el-color-picker></span>
      <span style="display:flex;align-items: center;margin-left:15px;">warning:<el-color-picker v-model="color4"
          @change="colorChange4">
        </el-color-picker></span>
      <span style="display:flex;align-items: center;margin-left:15px;">danger:<el-color-picker v-model="color5"
          @change="colorChange5">
        </el-color-picker></span>
    </div>
    <el-divider></el-divider>
    <span>灰色模式</span>
    <el-switch v-model="value1" @change="onSwitchChange1"></el-switch>
    <el-divider></el-divider>
    <span>开启水印</span>
    <el-switch v-model="wart" @change="onSwitchChange2"></el-switch>
    <el-divider></el-divider>
    <div>Button 按钮</div>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
    <el-divider></el-divider>
    <div class="aaa">Link 文字链接</div>
    <div>
      <el-link target="_blank">默认链接</el-link>
      <el-link type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </div>
    <el-divider></el-divider>
    <div class="aaa">Radio 单选框</div>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-radio v-model="radio" label="1" border>备选项1</el-radio>
      <el-radio v-model="radio" label="2" border>备选项2</el-radio>
    </div>
    <el-divider></el-divider>
    <div class="aaa">Checkbox 多选框</div>
    <el-checkbox v-model="checked">备选项</el-checkbox>
    <el-checkbox-group v-model="checkboxGroup1">
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
    <div>
      <el-checkbox v-model="checked" label="备选项1" border></el-checkbox>
    </div>
    <el-divider></el-divider>
    <div class="aaa">Input 输入框</div>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-divider></el-divider>
    <div class="aaa">InputNumber 计数器</div>
    <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
    <el-divider></el-divider>
    <div class="aaa">Select 选择器</div>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-divider></el-divider>
    <div class="aaa">Cascader 级联选择器</div>
    <el-cascader v-model="cascader" :options="optionsOne" :props="props"></el-cascader>
    <el-divider></el-divider>
    <div class="aaa">Switch 开关</div>
    <el-switch v-model="switch" active-text="按月付费" inactive-text="按年付费">
    </el-switch>
    <el-divider></el-divider>
    <div class="aaa">Slider 滑块</div>
    <el-slider v-model="slider"></el-slider>
    <el-divider></el-divider>
    <div class="aaa">TimePicker 时间选择器</div>
    <el-time-picker is-range arrow-control v-model="timepicker" range-separator="至" start-placeholder="开始时间"
      end-placeholder="结束时间" placeholder="选择时间范围">
    </el-time-picker>
    <el-divider></el-divider>
    <div class="aaa">TimeSelect 时间选择</div>
    <el-time-select v-model="timeselect" start='08:30' step='00:15' end='18:30' placeholder="选择时间">
    </el-time-select>
    <el-divider></el-divider>
    <div class="aaa">DatePicker 日期选择器</div>
    <el-date-picker v-model="datepicker1" type="date" placeholder="选择日期">
    </el-date-picker>
    <el-date-picker v-model="datepicker1" align="right" type="date" placeholder="选择日期" :disabled-date="disabledDate"
      :shortcuts="shortcuts">
    </el-date-picker>
    <el-date-picker v-model="datepicker1" type="week" format="gggg 第 ww 周" placeholder="选择周">
    </el-date-picker>
    <el-date-picker type="dates" v-model="datepicker2" placeholder="选择一个或多个日期">
    </el-date-picker>
    <el-date-picker v-model="datepicker1" type="daterange" range-separator="至" start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-date-picker v-model="datepicker1" type="daterange" align="right" unlink-panels range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts">
    </el-date-picker>
    <el-divider></el-divider>
    <div class="aaa">DateTimePicker 日期时间选择器</div>
    <el-date-picker v-model="valuepicker1" type="datetime" placeholder="选择日期时间">
    </el-date-picker>
    <el-date-picker v-model="valuepicker1" type="datetime" placeholder="选择日期时间" align="right" :shortcuts="shortcuts">
    </el-date-picker>
    <el-date-picker v-model="valuepicker1" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
    </el-date-picker>
    <el-date-picker v-model="valuepicker2" type="datetimerange" range-separator="至" start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-date-picker v-model="valuepicker3" type="datetimerange" :shortcuts="shortcuts1" range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期" align="right">
    </el-date-picker>
    <el-divider></el-divider>
    <div class="aaa">Upload 上传</div>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
      </template>
    </el-upload>
    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">
          只能上传 jpg/png 文件，且不超过 500kb
        </div>
      </template>
    </el-upload>
    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传 jpg/png 文件，且不超过 500kb
        </div>
      </template>
    </el-upload>
    <el-divider></el-divider>
    <div class="aaa">Upload 上传</div>
    <div style="text-align: center">
      <el-transfer v-model="rightValue" style="text-align: left; display: inline-block" filterable
        :left-default-checked="[2, 3]" :right-default-checked="[1]" :titles="['Source', 'Target']"
        :button-texts="['到左边', '到右边']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="datas">
        <template #default="{option}">
          <span>{{ option.key }} - {{ option.label }}</span>
        </template>
        <template #left-footer>
          <el-button class="transfer-footer" size="small">操作</el-button>
        </template>
        <template #right-footer>
          <el-button class="transfer-footer" size="small">操作</el-button>
        </template>
      </el-transfer>
    </div>
    <el-divider></el-divider>
    <div class="aaa">Form 表单</div>
    <el-form ref="form" :model="forms" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="forms.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="forms.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="forms.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="forms.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="forms.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="forms.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="forms.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="forms.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div class="aaa">Table 表格</div>
    <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter">
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div class="aaa">Table 表格</div>
    <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" effect="light">
      {{tag.name}}
    </el-tag>
    <div class="tag-group">
      <span class="tag-group__title">Dark</span>
      <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="dark" closable>
        {{ item.label }}
      </el-tag>
    </div>
    <div class="tag-group">
      <span class="tag-group__title">Plain</span>
      <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain" closable>
        {{ item.label }}
      </el-tag>
    </div>
    <el-divider></el-divider>

    <div class="aaa">Progress 进度条</div>
    <el-progress :percentage="50"></el-progress>
    <el-progress :percentage="40" status="success"></el-progress>
    <el-progress :percentage="40" status="warning"></el-progress>
    <el-progress :percentage="50" status="exception"></el-progress>
    <el-divider></el-divider>

    <div class="aaa">Pagination 分页</div>
    <el-pagination layout="prev, pager, next" :total="1000">
    </el-pagination>
    <el-pagination :current-page="4" background :page-sizes="[100, 200, 300, 400]" :page-size="100"
      layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
    <el-divider></el-divider>

    <div class="aaa">Badge 标记</div>
    <el-badge :value="1" class="item" style="margin-right: 40px;" type="primary">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="2" style="margin-right: 40px;" type="success">
      <el-button size="small">回复</el-button>
    </el-badge>
    <el-badge :value="2" style="margin-right: 40px;" type="warning">
      <el-button size="small">回复</el-button>
    </el-badge>
    <el-badge :value="2" style="margin-right: 40px;" type="danger">
      <el-button size="small">回复</el-button>
    </el-badge>
    <el-badge :value="222" style="margin-right: 40px;" type="info">
      <el-button size="small">回复</el-button>
    </el-badge>
    <el-badge value="new" style="margin-right: 40px;">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge is-dot class="item">数据查询</el-badge>
    <el-divider></el-divider>

    <div class="aaa">Alert 警告</div>
    <div>
      <el-alert title="成功提示的文案" type="success" style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="消息提示的文案" type="info" style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="警告提示的文案" type="warning" style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="错误提示的文案" type="error" style="margin-bottom: 10px;">
      </el-alert>
    </div>
    <div>
      <el-alert title="成功提示的文案" type="success" effect="dark" style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="消息提示的文案" type="info" effect="dark" style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="警告提示的文案" type="warning" effect="dark" style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="错误提示的文案" type="error" effect="dark" style="margin-bottom: 10px;">
      </el-alert>
    </div>
    <div style="margin: 15px 0;">
      <el-alert title="成功提示的文案" type="success" show-icon style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="消息提示的文案" type="info" show-icon style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="警告提示的文案" type="warning" show-icon style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="错误提示的文案" type="error" show-icon style="margin-bottom: 10px;"></el-alert>
    </div>
    <div>
      <el-alert title="成功提示的文案" type="success" description="文字说明文字说明文字说明文字说明文字说明文字说明" show-icon
        style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="消息提示的文案" type="info" description="文字说明文字说明文字说明文字说明文字说明文字说明" show-icon
        style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="警告提示的文案" type="warning" description="文字说明文字说明文字说明文字说明文字说明文字说明" show-icon
        style="margin-bottom: 10px;">
      </el-alert>
      <el-alert title="错误提示的文案" type="error" description="文字说明文字说明文字说明文字说明文字说明文字说明" show-icon
        style="margin-bottom: 10px;">
      </el-alert>
    </div>
    <el-divider></el-divider>

    <div class="aaa">Loading 加载</div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <el-divider></el-divider>

    <div class="aaa">Message 消息提示</div>
    <el-button :plain="true" @click="open1">成功</el-button>
    <el-button :plain="true" @click="open2">警告</el-button>
    <el-button :plain="true" @click="open3">消息</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
    <el-divider></el-divider>

    <div class="aaa">MessageBox 弹框</div>
    <el-button type="text" @click="open5">点击打开 Message Box</el-button>
    <el-divider></el-divider>

    <div class="aaa">Notification 通知</div>
    <el-button plain @click="open6">
      成功
    </el-button>
    <el-button plain @click="open7">
      警告
    </el-button>
    <el-button plain @click="open8">
      消息
    </el-button>
    <el-button plain @click="open9">
      错误
    </el-button>
    <el-divider></el-divider>

    <div class="aaa">NavMenu 导航菜单</div>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template #title>我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template #title>选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>
    <el-row class="tac">
      <el-col :span="12">
        <h5>默认颜色</h5>
        <el-menu default-active="2" style="width:210px;">
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template #title>选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <template #title>导航二</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <template #title>导航三</template>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <template #title>导航四</template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12">
        <h5>自定义颜色</h5>
        <el-menu :uniqueOpened="true" default-active="2" background-color="#545c64" style="width:210px;"
          text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template #title>选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <template #title>导航二</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <template #title>导航三</template>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <template #title>导航四</template>
          </el-menu-item>
          <el-submenu index="5">
            <template #title>
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="5-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <div class="aaa">Tabs 标签页</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>

    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="top">top</el-radio-button>
      <el-radio-button label="right">right</el-radio-button>
      <el-radio-button label="bottom">bottom</el-radio-button>
      <el-radio-button label="left">left</el-radio-button>
    </el-radio-group>

    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card">
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> 我的行程</span>
        </template>
        我的行程
      </el-tab-pane>
      <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-divider></el-divider>

    <div class="aaa">Breadcrumb 面包屑</div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <div class="aaa">Dropdown 下拉菜单</div>
    <el-dropdown>
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-divider></el-divider>

    <div class="aaa">Steps 步骤条</div>
    <el-steps :active="active111" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

    <el-steps :active="2">
      <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤 3" description="这段就没那么长了"></el-step>
    </el-steps>
    <el-divider></el-divider>

    <div class="aaa">Dialog 对话框</div>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="提示" v-model="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-divider></el-divider>

    <div class="aaa">Timeline 时间线</div>
    <div class="block" style="margin:15px;">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
          :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-divider></el-divider>

    <div class="aaa">Calendar 日历</div>
    <el-calendar v-model="calendarvalue"></el-calendar>
    <el-divider></el-divider>

    <div class="aaa">Backtop 回到顶部</div>
    <el-backtop target="#main-warp"></el-backtop>
    <el-divider></el-divider>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, getCurrentInstance } from "vue";
import { getLightColor } from "/@/utils/theme.ts";
import Watermark from "/@/utils/wartermark.ts";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
export default {
  name: "App",
  setup() {
    const { proxy } = getCurrentInstance();
    // proxy.$message("mesage")

    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    const state = reactive({
      calendarvalue: new Date(),
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          type: "success",
          icon: "",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
          type: "warning",
          icon: "",
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
          type: "danger",
          icon: "",
        },
        {
          content: "默认344 info",
          timestamp: "2018-04-03 20:46",
          type: "info",
          icon: "",
        },
      ],
      dialogVisible: false,
      active111: 0,
      tabPosition: "left",
      activeName: "second",
      loading: true,
      customColor: "#409eff",
      items: [
        { type: "", label: "标签一" },
        { type: "success", label: "标签二" },
        { type: "info", label: "标签三" },
        { type: "warning", label: "标签四" },
        { type: "danger", label: "标签五" },
      ],
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      forms: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rightValue: [1],
      datas: generateData(),
      imageUrl: "",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      valuepicker2: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10),
      ],
      valuepicker3: "",
      shortcuts1: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
      valuepicker1: "",
      color1: "#409EFF",
      color2: "#67C23A",
      color3: "#909399",
      color4: "#E6A23C",
      color5: "#F56C6C",
      value1: false,
      radio: "1",
      radio1: "上海",
      checked: true,
      cities: ["上海", "北京", "广州", "深圳"],
      checkboxGroup1: ["上海"],
      input: "",
      num: 1,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      value: "",
      props: { expandTrigger: "hover" },
      cascader: [],
      optionsOne: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
          ],
        },
      ],
      switch: true,
      slider: 50,
      timepicker: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      timeselect: "",
      datepicker1: "",
      datepicker2: "",
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      shortcuts: [
        {
          text: "Today",
          value: new Date(),
        },
        {
          text: "Yesterday",
          value: (() => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          })(),
        },
        {
          text: "A week ago",
          value: (() => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          })(),
        },
      ],
      wart: false,
    });
    function colorChange1() {
      document.documentElement.style.setProperty(
        "--color-primary",
        state.color1
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-1",
        getLightColor(state.color1, 0.1)
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-2",
        getLightColor(state.color1, 0.2)
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-3",
        getLightColor(state.color1, 0.3)
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-4",
        getLightColor(state.color1, 0.4)
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-5",
        getLightColor(state.color1, 0.5)
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-6",
        getLightColor(state.color1, 0.6)
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-7",
        getLightColor(state.color1, 0.7)
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-8",
        getLightColor(state.color1, 0.8)
      );
      document.documentElement.style.setProperty(
        "--color-primary-light-9",
        getLightColor(state.color1, 0.9)
      );
    }
    function colorChange2() {
      document.documentElement.style.setProperty(
        "--color-success",
        state.color2
      );
      document.documentElement.style.setProperty(
        "--color-success-light-1",
        getLightColor(state.color2, 0.1)
      );
      document.documentElement.style.setProperty(
        "--color-success-light-2",
        getLightColor(state.color2, 0.2)
      );
      document.documentElement.style.setProperty(
        "--color-success-light-3",
        getLightColor(state.color2, 0.3)
      );
      document.documentElement.style.setProperty(
        "--color-success-light-4",
        getLightColor(state.color2, 0.4)
      );
      document.documentElement.style.setProperty(
        "--color-success-light-5",
        getLightColor(state.color2, 0.5)
      );
      document.documentElement.style.setProperty(
        "--color-success-light-6",
        getLightColor(state.color2, 0.6)
      );
      document.documentElement.style.setProperty(
        "--color-success-light-7",
        getLightColor(state.color2, 0.7)
      );
      document.documentElement.style.setProperty(
        "--color-success-light-8",
        getLightColor(state.color2, 0.8)
      );
      document.documentElement.style.setProperty(
        "--color-success-light-9",
        getLightColor(state.color2, 0.9)
      );
    }
    function colorChange3() {
      document.documentElement.style.setProperty("--color-info", state.color3);
      document.documentElement.style.setProperty(
        "--color-info-light-1",
        getLightColor(state.color3, 0.1)
      );
      document.documentElement.style.setProperty(
        "--color-info-light-2",
        getLightColor(state.color3, 0.2)
      );
      document.documentElement.style.setProperty(
        "--color-info-light-3",
        getLightColor(state.color3, 0.3)
      );
      document.documentElement.style.setProperty(
        "--color-info-light-4",
        getLightColor(state.color3, 0.4)
      );
      document.documentElement.style.setProperty(
        "--color-info-light-5",
        getLightColor(state.color3, 0.5)
      );
      document.documentElement.style.setProperty(
        "--color-info-light-6",
        getLightColor(state.color3, 0.6)
      );
      document.documentElement.style.setProperty(
        "--color-info-light-7",
        getLightColor(state.color3, 0.7)
      );
      document.documentElement.style.setProperty(
        "--color-info-light-8",
        getLightColor(state.color3, 0.8)
      );
      document.documentElement.style.setProperty(
        "--color-info-light-9",
        getLightColor(state.color3, 0.9)
      );
    }
    function colorChange4() {
      document.documentElement.style.setProperty(
        "--color-warning",
        state.color4
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-1",
        getLightColor(state.color4, 0.1)
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-2",
        getLightColor(state.color4, 0.2)
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-3",
        getLightColor(state.color4, 0.3)
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-4",
        getLightColor(state.color4, 0.4)
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-5",
        getLightColor(state.color4, 0.5)
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-6",
        getLightColor(state.color4, 0.6)
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-7",
        getLightColor(state.color4, 0.7)
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-8",
        getLightColor(state.color4, 0.8)
      );
      document.documentElement.style.setProperty(
        "--color-warning-light-9",
        getLightColor(state.color4, 0.9)
      );
    }
    function colorChange5() {
      document.documentElement.style.setProperty(
        "--color-danger",
        state.color5
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-1",
        getLightColor(state.color5, 0.1)
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-2",
        getLightColor(state.color5, 0.2)
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-3",
        getLightColor(state.color5, 0.3)
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-4",
        getLightColor(state.color5, 0.4)
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-5",
        getLightColor(state.color5, 0.5)
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-6",
        getLightColor(state.color5, 0.6)
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-7",
        getLightColor(state.color5, 0.7)
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-8",
        getLightColor(state.color5, 0.8)
      );
      document.documentElement.style.setProperty(
        "--color-danger-light-9",
        getLightColor(state.color5, 0.9)
      );
    }
    function onSwitchChange1() {
      document.body.setAttribute(
        "style",
        state.value1 ? `filter:grayscale(1);overflow:hidden;` : ""
      );
    }
    function onSwitchChange2() {
      state.wart
        ? Watermark.set("small@小柒")
        : Watermark.del();
    }
    function open1() {
      proxy.$message.success({
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    }
    function open2() {
      ElMessage.warning({
        message: "警告哦，这是一条警告消息",
        type: "warning",
      });
    }
    function open3() {
      ElMessage({
        message: "这是一条消息提示",
        type: "info",
      });
    }
    function open4() {
      ElMessage.error({
        message: "错了哦，这是一条错误消息",
        type: "error",
      });
    }
    function open5() {
      ElMessageBox.confirm("success", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    }
    function open6() {
      ElNotification({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success",
      });
    }
    function open7() {
      ElNotification({
        title: "警告",
        message: "这是一条警告的提示消息",
        type: "warning",
      });
    }
    function open8() {
      ElNotification.info({
        title: "消息",
        message: "这是一条消息的提示消息",
      });
    }
    function open9() {
      ElNotification.error({
        title: "错误",
        message: "这是一条错误的提示消息",
      });
    }
    function next() {
      if (state.active111++ > 2) state.active111 = 0;
    }
    return {
      colorChange1,
      colorChange2,
      colorChange3,
      colorChange4,
      colorChange5,
      open1,
      open2,
      open3,
      open4,
      open5,
      open6,
      open7,
      open8,
      open9,
      next,
      onSwitchChange1,
      onSwitchChange2,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
#main-warp {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>