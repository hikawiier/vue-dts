// '' |
// 'forbidden-area' |
// 'find-nothing' |
// 'find-item' |
// 'find-enemy' | 'attack-enemy' | 'attacked-by-enemy' |
// 'map' | 'to-map' |
// 'crafting' |
// 'sleep' | 'heal' |
// 'tactics' |
// 'shop'
/** 游戏状态 */
export interface GameState {
  /** 是否显示抽屉 */
  showDrawer?: boolean
  /** 抽屉类别 */
  drawerType?: string
  /** 抽屉高度 */
  drawerHeight?: number
  /** 加载状态 */
  loading?: boolean,
  /** 玩家状态 */
  playerState?: PlayerState
  /** 游戏日志 */
  log?: {
    /** 时间 */
    time: string,
    /** 内容 */
    content: string,
  }[],
  /** 搜寻状态 */
  searchState?: SearchState
  /** 行动日志 */
  actionLog?: string
}
/** 物品 */
export interface Item {
  /** 类型 */
  type: string,
  /** 名称 */
  name: string,
  /** 属性 */
  props: string,
  /** 品质 */
  quality: number,
  /** 耐久 */
  durability: number,
}
/** 玩家状态 */
export interface PlayerState {
  /** 玩家信息 */
  playerInfo: {
    /** 称号 */
    nick: string
    /** 姓名 */
    name: string
    /** 性别 */
    sex: string
    /** 编号 */
    id: number
    /** 头像 */
    avatar: string
  }
  /** 等级 */
  level: {
    /** 当前等级 */
    nowLevel: number
    /** 经验 */
    exp: number
    /** 升级经验 */
    upgradeExp: number
  }
  /** 生命 */
  hp: {
    /** 当前生命 */
    nowHp: number
    /** 最大生命 */
    maxHp: number
  }
  /** 体力 */
  mp: {
    /** 当前体力 */
    nowMp: number
    /** 最大体力 */
    maxMp: number
  }
  /** 怒气 */
  rage: number
  /** 内定称号 */
  gift: string
  /** 基础姿态 */
  tactic: {
    /** 当前姿态id */
    nowTacticId: string
    /** 当前姿态 */
    nowTactic: string
    /** 可选id */
    idList: string[]
    /** 类型 */
    type: string[]
    /** tips */
    tips: string[]
  }
  /** 应战策略 */
  pose: {
    /** 当前应战策略id */
    nowPoseId: string
    /** 当前应战策略 */
    nowPose: string
    /** 可选id */
    idList: string[]
    /** 类型 */
    type: string[]
    /** tips */
    tips: string[]
  },
  /** 攻击力 */
  attack: number,
  /** 防御力 */
  defense: number,
  /** 团队 */
  team: string,
  /** 熟练度 */
  proficiency: {
    /** 殴熟 */
    melee: number,
    /** 斩熟 */
    slash: number,
    /** 射熟 */
    shoot: number,
    /** 投熟 */
    throw: number,
    /** 爆熟 */
    blast: number,
    /** 灵熟 */
    spirit: number,
  },
  /** 负面状态 */
  debuff: string[],
  /** 装备 */
  equipment: {
    /** 武器 */
    weapon: Item,
    /** 装甲 */
    armor: Item,
    /** 护臂 */
    arm: Item,
    /** 头盔 */
    helmet: Item,
    /** 靴子 */
    boot: Item,
    /** 饰品 */
    accessory: Item,
  },
  /** 背包 */
  bag: {
    [key: string]: Item | null,
    item1: Item | null,
    item2: Item | null,
    item3: Item | null,
    item4: Item | null,
    item5: Item | null,
    item6: Item | null,
  },
  /** 金钱 */
  money: number,
  /** 当前地区 */
  area: {
    /** 当前地区id */
    nowArea: number,
    /** 当前地区剩余人数 */
    aliveNum: number,
    /** 当前地区天气 */
    weather: number,
    /** 禁区进度列表 */
    areaList: number[],
    /** 当前禁区数量 */
    areaNum: number,
    /** 每次禁区增加数 */
    areaAdd: number,
  },
  /** 攻击方式 */
  attackType: {
    type1: {
      id: string,
      name: string,
    }
    type2: {
      id: string | null,
      name: string | null,
    }
  }
  /** 视野 */
  semo: {
    [key: string]: string[],
  }
}
/** 搜寻状态 */
export interface SearchState {
  /** 发现物品 */
  findItem: Item | null,
  /** 发现敌人 */
  findEnemy: {
    /** 敌方类型 */
    type: string,
    /** 敌方称号 */
    title: string,
    /** 敌方等级 */
    level: number,
    /** 敌方姓名 */
    name: string,
    /** 敌方称号 */
    sub: string,
    /** 敌方头像 */
    avatar: string,
    /** 敌方怒气 */
    rage: number,
    /** 敌方体力 */
    mp: number,
    /** 敌方生命 */
    hp: number,
    /** 敌方攻击 */
    attack: number,
    /** 敌方武器种类 */
    weaponType: string,
    /** 敌方武器 */
    weapon: string,
    /** 敌方应战策略 */
    pose: string,
    /** 敌方基础姿态 */
    tactic: string,
    /** 敌方受伤部位 */
    hurt: string,
    /** 战斗状态 */
    battleState: string,
  } | null,
}

export interface Action {
  name: string
  action: Function
  active?: boolean
}
export interface ActionState {
  action: Array<Action>
  oldAction: Array<Action>
  oldType: string | undefined
  showDetail: boolean // 是否显示详情
  firstCheck: boolean // 初始检测
  height: number // 高度
}