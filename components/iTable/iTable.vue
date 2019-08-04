<template>
    <div class="table-bg">
        <el-table
                ref="multipleTable"
                :data="tableData"
                border
                style="width: 100%;"
                :height="height"
                @sort-change='sort_change'
                @selection-change="changeFun">
            <template v-for="(column) in columns">
                <el-table-column v-if="column.type"
                                 :type="column.type"
                                 :key="column.desc"
                                 align="center"
                                 :label="column.name"
                                 :width="column.width==undefined?'auto':column.width"
                                 :sortable="column.sortable?'custom':false"
                                 :fixed="column.fixed">
                </el-table-column>
                <el-table-column :prop="column.desc"
                                 v-if="!column.type"
                                 :key="column.desc"
                                 :label="column.name"
                                 :width="column.width==undefined?'auto':column.width"
                                 :sortable="column.sortable?'custom':false"
                                 :fixed="column.fixed"
                                 :show-overflow-tooltip="column.tooltip?true:false"
                                 align="center">
                    <template slot-scope="scope">
                        <!--传入模板方法，方法返回true时显示灰色-->
                        <div v-if="column.templet!=undefined && typeof column.templet == 'function' && column.templet(scope.row)"
                             :style="'text-align:right;text-decoration: underline;color:#ccc;'+column.style">
                            {{ column.format?fmtMoney(scope.row[column.desc]):scope.row[column.desc] }}
                        </div>
                        <!--传入模板方法，方法返回false时，可点击-->
                        <div v-else-if="column.templet!=undefined && typeof column.templet == 'function' && !column.templet(scope.row)"
                             :style="'color:#409EFF;text-align:right;text-decoration: underline;'+column.style"
                             @click="btnClickfunc(column,scope.row,column.desc)">
                            {{ column.format?fmtMoney(scope.row[column.desc]):scope.row[column.desc] }}
                        </div>
                        <!--click为true可点击-->
                        <div v-else-if="column.click"
                             :style="'color:#409EFF;text-align:right;text-decoration: underline;'+column.style"
                             @click="btnClickfunc(column,scope.row,column.desc)"> {{
                            column.format?fmtMoney(scope.row[column.desc]):scope.row[column.desc] }}
                        </div>
                        <!--图片类型-->
                        <div v-else-if="column.image"
                             :style="column.style"
                             @click="btnClickfunc(column,scope.row,column.desc)">
                            <img class="image" :src="scope.row[column.desc]" alt="">
                        </div>
                        <!--edit为true可编辑，format金额格式化-->
                        <div v-else-if="column.edit" :style="column.style">
                            <el-input v-if="column.editType=='input'"
                                      size="mini"
                                      placeholder="请输入内容"
                                      @change="editInput(scope.row)"
                                      v-model="scope.row[column.desc]">
                            </el-input>
                            <el-select v-else-if="column.editType=='select'"
                                       size="mini"
                                       @change="editInput(scope.row)"
                                       v-model="scope.row[column.desc]"
                                       placeholder="请选择">
                                <el-option
                                        v-for="item in column.editSelOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div v-else-if="column.btns" :style="'text-align:center;'+column.style">
                            <!--表格内按钮，可点击，传入方法类型，用clickType区分按钮点击事件。-->
                            <el-button v-for="(btn ,index) in column.btns" size="mini" :class="btn.btnClass"
                                       :key="index" :type="btn.btnType"
                                       @click="handleBtnClick(btn.clickType, scope.row,scope.$index,tableData)"
                                       :icon="btn.icon">{{btn.name}}
                            </el-button>
                        </div>
                        <div v-else :style="column.style" :class="column.tooltip?'btable-tooltip':''"> {{
                            column.format?fmtMoney(scope.row[column.desc]):scope.row[column.desc] }}
                        </div>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="table-page">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="pagination.sizes"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
/**
   * table组件：
   * 传入data，columns
   * columns可传入模板函数，
   * 可定义单元格点击事件，
   * 可编辑，
   * 可选择，
   * 前台分页，
   * 前台排序，
   * 配置需要格式化的金额
   */
export default {
  name: 'xmtz',
  data () {
    return {
      multipleSelection: [], // 已选中的行
      isUpdateSelection: true// 是否更新已选中
    }
  },
  props: {
    tableData: {
      type: [Array, Object],
      required: true
    },
    height: {
      type: Number,
      default: 500
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          sizes: [10, 20, 30, 40, 50],
          pageSize: 10,
          total: 100
        }
      }
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    fmtMoney (val) { // 格式化金额
      return this.fmoney(val)
    },
    sort_change (col) { // 排序
      this.tableData.sort(this.sortby(col.prop, '', col.order))
    },
    // 页数
    handleCurrentChange (currentIndex) {
      this.$emit('handleCurrentChange', { 'type': 'INDEX', data: currentIndex })
    },
    // 数量
    handleSizeChange (pagesize) {
      this.$emit('handleCurrentChange', { 'type': 'SIZE', data: pagesize })
    },
    btnClickfunc (column, row, clickType) { // 按钮点击
      this.$emit('btnClickFunc', { column: column, row: row, type: clickType })
    },
    // 操作按钮点击
    handleBtnClick (clickType, row, index, tableData) {
      this.$emit('handleBtnClick', { clickType: clickType, row: tableData[index], index: index, tableData })
    },
    changeFun (val) { // 获取已选中的行
      if (this.isUpdateSelection) {
        this.multipleSelection = val
      } else {
        this.isUpdateSelection = true
      }
    },
    editInput (row) { // 表格内输入框编辑触发
      this.$refs.multipleTable.toggleRowSelection(row, true)// 选中所在行
    },
    // 返回选中的数据
    getMultiple () {
      if (this.multipleSelection && this.multipleSelection.length === 0) return []
      return this.multipleSelection
    },
    updateSeletion () { // 更新选中行
      var that = this
      this.$nextTick(() => {
        that.tableData.forEach((item) => {
          if (this.multipleSelection.indexOf(item) >= 0) {
            that.isUpdateSelection = false// 不更新选中行
            that.$refs.multipleTable.toggleRowSelection(item, true)// 选中所在行
          }
        })
        that.isUpdateSelection = true// 更新选中行
      })
    },
    fmoney () {
      if (s == '*') {
        return s
      }

      var n = 2
      n = n >= 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
      var l = s
        .split('.')[0]
        .split('')
        .reverse()
      var r = s.split('.')[1]
      r = r == null ? '' : '.' + r
      var t = ''
      /// /console.log(l)
      if (l[l.length - 1] === '-') { // 负数不需要分隔号,
        for (var i = 0; i < l.length; i++) {
          if (l[i] === '-') {
            t += l[i] + ''
            continue
          }
          // 不是数组的倒数第二个元素才加"," ["0", "4", "5", "-"]
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length - 1 ? ',' : '')

          // i + 1 != l.length会变成-,540.00,因为在5时元素位置2+1为3非数组长度
          // t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
        }
      } else {
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
        }
      }
      return (
        t
          .split('')
          .reverse()
          .join('') + r
      )
    },
    sortby (name, minor, sort) {
      return function (o, p) {
        var a, b
        if (o && p && typeof o === 'object' && typeof p === 'object') {
          a = o[name]
          b = p[name]
          if (a === b) {
            return typeof minor === 'function' ? minor(o, p) : 0
          }
          if (typeof a === typeof b) {
            a = parseFloat(a.toString().replace(/,/g, ''))
            b = parseFloat(b.toString().replace(/,/g, ''))
            if (sort == 'ascending') {
              return a < b ? -1 : 1
            } else if (sort == 'descending') {
              return a < b ? 1 : -1
            }
          }
          if (sort == 'ascending') {
            return typeof a < typeof b ? -1 : 1
          } else if (sort == 'descending') {
            return typeof a < typeof b ? 1 : -1
          }
        } else {
          throw ('error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .btable-tooltip {
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .image{
        width: 100%;
    }
</style>
