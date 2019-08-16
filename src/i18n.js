import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      status: {
        tableCount: 'Task Count', tableRemain: 'Remaining',
        tableOverdue: 'Overdue', tableComp: 'Completed', tableRate: 'Completion', noTasks: 'No Tasks'
      },
      menu: {
        titleTasks: 'Tasks', delComp: 'Delete Completed', deleteAll: 'Delete All Tasks', titleTheme: 'Themes', modePastel: 'Pastel Mode', modeDark: 'Dark Mode', modeClassic: 'Classic Mode'
      },
      table: {
        status: 'Status', titleCategory: 'Category', titleName: 'Todo Name', titleLimit: 'Deadline', titleRemain: 'Remaining', days: 'days', priorityHigh: 'High', priorityMid: 'Mid', priorityLow: 'Low'
      },
      forms: {
        titlePriority: 'Priority', titleEditData: 'Edit Data', inputContentsNew: 'Add new todo item here...', inputContentsEdit: 'Edit title name here...', inputCategory: 'Enter category name...', inputCategoryEdit: 'Edit category name...', buttonSubmit: 'submit', buttonSubmitEdit: 'update', buttonReset: 'reset'
      },
      countDown: {
        today: 'TODAY', passed: 'OVERDUE'
      },
      text: {
        none: 'Please add tasks from the form above.', passed: 'Overdue', completed: 'Completed'
      }
    },
    ja: {
      status: {
        tableCount: 'タスク総数', tableRemain: '残数', tableOverdue: '期日過ぎ', tableComp: '完了済み', tableRate: '完遂率', noTasks: 'タスク無'
      },
      menu: {
        titleTasks: 'タスク', delComp: '完了済みタスク削除', deleteAll: '全てのタスクを削除', titleTheme: 'テーマ', modePastel: 'パステルモード', modeDark: 'ダークモード', modeClassic: 'クラシックモード'
      },
      table: {
        status: '状態', titleCategory: '類別', titleName: 'タスク名', titleLimit: '期限', titleRemain: '残留日数', days: '日', priorityHigh: '高', priorityMid: '中', priorityLow: '低'
      },
      forms: {
        titlePriority: '優先度', titleEditData: 'データ編集', inputContentsNew: '新しいタスクを追加', inputContentsEdit: 'タスク名を変更', inputCategory: '類別名を追加', inputCategoryEdit: '類別名を変更', buttonSubmit: '追加', buttonSubmitEdit: '変更', buttonReset: 'リセット'
      },
      countDown: {
        today: '今日', passed: '期限過ぎ'
      },
      text: {
        none: '上記フォームからタスクを入力してください', passed: '期限過ぎ', completed: '完'
      }
    },
    zh: {
      status: {
        tableCount: '任务总数', tableRemain: '剩余数', tableOverdue: '过期任务', tableComp: '完成数', tableRate: '完成率', noTasks: '没有任务'
      },
      menu: {
        titleTasks: '任务', delComp: '消除完成的项目', deleteAll: '消除所有任务', titleTheme: '模式', modePastel: '粉笔模式', modeDark: '暗黑模式', modeClassic: '经典模式'
      },
      table: {
        status: '状态', titleCategory: '类别', titleName: '项目名', titleLimit: '期限', titleRemain: '剩余天数', days: '天', priorityHigh: '高', priorityMid: '中', priorityLow: '低'
      },
      forms: {
        titlePriority: '优先度', titleEditData: '变更项目', inputContentsNew: '追加新的项目', inputContentsEdit: '变更项目名', inputCategory: '输入类别名', inputCategoryEdit: '变更类别名', buttonSubmit: '追加', buttonSubmitEdit: '变更', buttonReset: '重置'
      },
      countDown: {
        today: '今天', passed: '过期'
      },
      text: {
        none: '请追加项目', passed: '过期', completed: '完'
      }
    }
  }
})
